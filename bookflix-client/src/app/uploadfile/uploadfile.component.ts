import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CreateService} from '../services/create.service'
import { Location } from '@angular/common';
import { coverI } from '../models/cover';
import { RxwebValidators, file } from '@rxweb/reactive-form-validators';
import { pdfI, pdfResponseI, bookFileI } from '../models/pdf';


@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private location:Location) { }
  form: FormGroup;
  form_upload:FormGroup;
  bookID:string;
  selected:boolean=false;
  selectedPDF:boolean=false;
  fileid:string;
  createdPDF:boolean=false;
  fileName:String="NULL";
  release:boolean=false;
  concealment:boolean=false

  ngOnInit(): void {
    var dateMin=new Date(2000-1-1);
    var dateMax=new Date(2999-1-1);
    var nextChapter= parseInt(localStorage.getItem('CHAPTER_NUMBER'))+1
    console.log(nextChapter);
    this.form = this.formBuilder.group({
      file:["",[Validators.required, RxwebValidators.extension({extensions:["pdf"]})]],
    });

    this.form_upload = this.formBuilder.group({
      release:[{value:"2000-01-01",disabled:false},[Validators.required, RxwebValidators.date]],
      concealment:[{value:"2050-01-01",disabled:false},[Validators.required, RxwebValidators.date ]],
      chapternumber:[nextChapter,[Validators.required,Validators.min(1)]]
    });

    this.bookID=localStorage.getItem("BOOK_ID");

  }



  changestring(){
    this.selected=true;
    var fileinput = (<HTMLInputElement>document.getElementById('file'))
    this.fileName=fileinput.files[0].name
    if(fileinput.files[0].name.split('.').pop().toLowerCase()=="pdf"){
      console.log("Se selecciono un archivo pdf correctamente.")
      this.selectedPDF=true;
      var reader = new FileReader();
      reader.readAsDataURL(fileinput.files[0]);
      reader.onload = function (){
        var res: string = reader.result as string; //base string
        res=res.substring(res.indexOf(',')+1)
        localStorage.setItem("PDF_BASE64",res);

      };
    }
    else{
      this.selectedPDF=false;
    }
  }

  onCreate(): void {
  const pdf: pdfI = {
    file:localStorage.getItem("PDF_BASE64"),
    filename: this.bookID
  };
  this.createService.uploadPDF(pdf).subscribe((pdfResponse:pdfResponseI) => {
    this.fileid=pdfResponse.fileid
    this.createdPDF=true;
  })
  }

  onUpload(form_upload): void {
    if (form_upload.value.concealment>form_upload.value.release){
    const bookFile: bookFileI = {
      fileId: this.fileid,
      release:form_upload.value.release,
      concealment:form_upload.value.concealment,
      chapternumber:form_upload.value.chapternumber,
      };
      console.log(bookFile);
        this.createService.uploadBookFile(bookFile, this.bookID).subscribe(res=> {
        console.log('Response:', res)
        localStorage.setItem("REFRESH","true");
        localStorage.removeItem("PDF_BASE64");
        this.location.back()},
       (err:any) =>{
        console.log ('Error al subir archivo.');
        console.log(err.statusText, err.status);
      }
      )}
      else{
          this.form_upload.controls['concealment'].setErrors({invalid:true});
      }
      }


  goBack(){
    localStorage.removeItem("PDF_BASE64");
    this.location.back();
  }

  uploadAgain(){
    if(this.createdPDF){
      this.createdPDF=false;
    }else{
      this.createdPDF=true;
    }
  }


}
