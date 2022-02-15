import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CreateService} from '../services/create.service'
import { Location } from '@angular/common';
import { coverI } from '../models/cover';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-uploadcover',
  templateUrl: './uploadcover.component.html',
  styleUrls: ['./uploadcover.component.css']
})
export class UploadcoverComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private location:Location) { }
  form: FormGroup;
  bookID:string;
  selected:boolean=false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cover:["",[Validators.required, RxwebValidators.extension({extensions:["jpg","jpeg","png","bmp"]})]],
    });
    this.bookID=localStorage.getItem("BOOK_ID");

  }


  getBookByID(){

  }


changestring(){
  this.selected=true;
  var reader = new FileReader();
  var fileinput = (<HTMLInputElement>document.getElementById('cover'))
  reader.readAsDataURL(fileinput.files[0]);
  reader.onload = function () {
    var res: string = reader.result as string; //base string
    console.log(reader.result);
    res=res.split(',')[1];
    localStorage.setItem("BASE64",res);
  };
}


onCreate(form): void {




    const encodedCover = btoa(form.value.cover)
    const cover: coverI = {
      file:localStorage.getItem("BASE64"),
      filename: this.bookID
      };

      this.createService.uploadCover(cover, this.bookID).subscribe(res=> {
        console.log('Response:', res)
        localStorage.setItem("REFRESH","true");
        localStorage.removeItem("BASE64");
        this.location.back()},
       (err:any) =>{
        console.log ('Error al subir archivo.');
        console.log(err.statusText, err.status);
      })
      }


  goBack(){
    localStorage.removeItem("BASE64");
    this.location.back();
  }


}
