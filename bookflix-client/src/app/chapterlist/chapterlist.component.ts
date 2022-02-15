import {Component, OnInit} from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';
import { bookI } from '../models/book';
import { Location } from '@angular/common';
import { UserI } from '../models/user';
import { ReadingBookI } from '../models/account';



@Component({
  selector: 'app-chapterlist',
  templateUrl: './chapterlist.component.html',
  styleUrls: ['./chapterlist.component.css']
})
export class ChapterlistComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private location:Location,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService) { }


    book:bookI;
    currentPage:number
    isStarted:boolean=false;
    user:UserI;
    hasCover:boolean=true;
    date;

  ngOnInit(): void {
    this.getBookByID();
    this.getUserByID();
    this.date=new Date().toISOString()
  }


   getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book = book
      if(book.cover==null){this.hasCover=false}

    })
  }

  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID"))
    .subscribe((user:UserI) => {
      this.user= user
    })
   }


readChapter(pdfID:string,i:number){

     const readingBook: ReadingBookI = {
        user_id:localStorage.getItem("USER_ID"),
        book_id:localStorage.getItem("BOOK_ID"),
        profile_id:localStorage.getItem("PROFILE_ID"),
        current_page:i+1 ,

        };

      this.ModifyService.addReadingBook(readingBook).subscribe(res=>
        {
          localStorage.setItem("PDF_ID",pdfID)
          localStorage.setItem("CHAPTER_NUMBER",i.toString())
        this.router.navigateByUrl('/readbook');
        }
        )
      }

    goBack(){
      this.location.back();
    }
}
