import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { ModifyService } from '../services/modify.service'
import { bookI } from '../models/book'
import { Router } from '@angular/router';
import { ReadingBookI } from '../models/account';
import { Location } from '@angular/common';
import { UserI } from '../models/user';
import { PdfViewerModule } from 'ng2-pdf-viewer';



@Component({
  selector: 'app-readbook',
  templateUrl:'./readbook.component.html',
  styleUrls: ['./readbook.component.css']
})


export class ReadbookComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService, private router: Router, private ModifyService:ModifyService, private location:Location, private pdfViewerComponent: PdfViewerModule) { }

  ngOnInit(): void {
    this.getBookByID()
    this.getPdfFileByID()

  }

  book:bookI;
  pdf:string
  pageVariable:number;
  finished:boolean=false;
  hasNext:boolean;
  hasLast:boolean;
  thisChapter:number=0;
  date;


  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      (this.book = book)
      var NextChapter=Number(localStorage.getItem("CHAPTER_NUMBER"))+1
      var LastChapter=Number(localStorage.getItem("CHAPTER_NUMBER"))-1
      this.date=new Date().toISOString()
      if((book.file[NextChapter]!==undefined)&&((book.file[NextChapter].concealment>this.date)&&(book.file[NextChapter].release<this.date)))
      {
        this.hasNext=true
      }
      if((book.file[LastChapter]!==undefined)&&((book.file[LastChapter].concealment>this.date)&&(book.file[LastChapter].release<this.date)))
      {
        this.hasLast=true
      }
      this.thisChapter=book.file[localStorage.getItem("CHAPTER_NUMBER")].chapternumber
    })
  }

  getPdfFileByID(){
    var api="http://localhost:3000/api/files/downloads/content/"
    this.pdf=api+localStorage.getItem("PDF_ID")
  }

  goHome(){
    localStorage.removeItem("PDF_ID")
    this.router.navigateByUrl("/home")
  }

  goto(i){
    var LastChapter=Number(localStorage.getItem("CHAPTER_NUMBER"))-1
    var LastPdfID=this.book.file[i].fileId;
    localStorage.setItem("PDF_ID",LastPdfID);
    localStorage.setItem("CHAPTER_NUMBER",i)
    location.reload();
  }

  nextChapter(){
    var NextChapter=Number(localStorage.getItem("CHAPTER_NUMBER"))+1
    if(this.book.file[NextChapter]!==undefined){
    var NextPdfID=this.book.file[NextChapter].fileId;
    localStorage.setItem("PDF_ID",NextPdfID);
    localStorage.setItem("CHAPTER_NUMBER",NextChapter.toString())
    location.reload();
    }else{
      this.finished=true;
      console.log("libro terminado")
    }
  }


}
