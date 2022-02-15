import {Component, OnInit} from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';
import { RxwebValidators, file } from '@rxweb/reactive-form-validators';
import { bookI, modifyComplete } from '../models/book';
import { Location } from '@angular/common';
import { bookFileI } from '../models/pdf';



@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.css']
})
export class FilelistComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private location:Location,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService) { }

  selected:boolean=false;
  book:bookI;
  bookTitle:String;
  form_upload:FormGroup;
  chapterNumber:number;
  isComplete:boolean;
  hasFiles:boolean=true;

  ngOnInit(): void {
    this.getBookByID();
    this.form_upload = this.formBuilder.group({
      release:["",[Validators.required, RxwebValidators.date]],
      concealment:["",[Validators.required, RxwebValidators.date ]],
      chapternumber:[null,[Validators.required,Validators.min(1)]]
    });
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book=book
      this.isComplete=book.complete;
      if((book.file[0]==null)||(book.file[0]==undefined)){
        this.hasFiles=false;
      }

    })
  }

  markComplete(id:string){
    this.router.navigateByUrl('/bookdetailadmin');

  }

  uploadFile(id: string,number){
    localStorage.setItem('BOOK_ID',id);
    localStorage.setItem('CHAPTER_NUMBER',number);
    this.router.navigateByUrl('/uploadfile');
  }



  deleteFile(id:string){
    this.DeleteService.fileDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/filelist']));
    })
  }

  changeDates(BookFileID:string, pdfID:string,chapterNumber:number,release:Date,concealment:Date){
    this.selected=true;
    this.chapterNumber=chapterNumber;
    var auxRelease=release.toString().substring(0, 10);
    var auxConcealment=concealment.toString().substring(0, 10);
    this.form_upload.controls['chapternumber'].setValue(chapterNumber);
    this.form_upload.controls['concealment'].setValue(auxConcealment);
    this.form_upload.controls['release'].setValue(auxRelease);
    localStorage.setItem("PDF_ID",pdfID);
    localStorage.setItem("BOOK_FILE_ID",BookFileID);
  }


  onChange(form_upload){
    if (form_upload.value.concealment>form_upload.value.release){
    const bookFile: bookFileI = {
      fileId: localStorage.getItem("PDF_ID"),
      release:form_upload.value.release,
      concealment:form_upload.value.concealment,
      chapternumber:form_upload.value.chapternumber,
      };

    this.ModifyService.changeDates(bookFile,localStorage.getItem("BOOK_FILE_ID")).subscribe(res=> {
      console.log('Response:', res)
      localStorage.removeItem("PDF_ID");
      localStorage.removeItem("BOOK_FILE_ID");
      this.selected=false;
      location.reload();
    })
    }else{
      this.form_upload.controls['concealment'].setErrors({invalid:true});
    }
  }

  cancel(){
    this.selected=false;
  }



}
