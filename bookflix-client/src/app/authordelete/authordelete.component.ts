import {Component, OnInit} from '@angular/core';
import { newsI } from '../models/news';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';

import { authorI } from '../models/author'

@Component({
  selector: 'app-authordelete',
  templateUrl: './authordelete.component.html',
  styleUrls: ['./authordelete.component.css']
})
export class AuthordeleteComponent implements OnInit {
  authors:authorI;

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService) { }

  hasBooks:boolean=false;

  ngOnInit(): void {
    this.getAuthors();
  }

getAuthors(){
  this.RetrieveService.getauthors()
    .subscribe((authors:authorI) => {(this.authors = authors);})
  }


deleteAuthor(id: string):void{
  this.DeleteService.authorDelete(id).subscribe((res) => {
    console.log('Response:', res);
    this.hasBooks=false;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['/authordelete']));
  },(err:any) =>{
    console.log ('Error al borrar autor.');
    console.log(err.statusText, err.status);
    if (err.status === 400){
      this.hasBooks=true;
    }});
}



}
