import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateService} from '../services/create.service'
import { RetrieveService } from '../services/retrieve.service'

import { bookI,bookCreateI, bookModifyI} from '../models/book';
import { authorI, getAuthorI } from '../models/author';
import { genreI, getGenreI } from '../models/genre';
import { publisherI, getPublisherI } from '../models/publisher';
import { Location } from '@angular/common';
import { ModifyService } from '../services/modify.service';

@Component({
  selector: 'app-bookmodify',
  templateUrl: './bookmodify.component.html',
  styleUrls: ['./bookmodify.component.css']
})
export class BookmodifyComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private RetrieveService:RetrieveService, private location:Location, private ModifyService:ModifyService) {
     }


  form: FormGroup;
  authors:getAuthorI;
  genres:getGenreI;
  publishers:getPublisherI;
  book:bookI;
  hasCover:boolean=true;

  ngOnInit(): void {
    this.getBookByID()
    var isComplete=false;
    if (localStorage.getItem("BOOK_COMPLETE")=="true"){isComplete= true;};
    this.form = this.formBuilder.group({
      title: [localStorage.getItem("BOOK_TITLE"), [Validators.required]],
      isbn: [localStorage.getItem("BOOK_ISBN"), [Validators.required, Validators.pattern("^[0-9]*$")]],
      publisher:[localStorage.getItem("BOOK_PUBLISHER"), [Validators.required]],
      author:[localStorage.getItem("BOOK_AUTHOR"), [Validators.required]],
      genres:[localStorage.getItem("BOOK_GENRES"), [Validators.required]],
      complete:[isComplete,]
  });

  this.getAuthors();
  this.getGenres();
  this.getPublishers();
  }


  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      (this.book = book)
      if(book.cover==null){this.hasCover=false}

    })
  }


  createAuthor(){
    localStorage.setItem("BOOK_TITLE", this.form.value.title);
    localStorage.setItem("BOOK_ISBN",this.form.value.isbn );
    this.router.navigateByUrl('/authorcreate')
  }

  createGenre(){
    localStorage.setItem("BOOK_TITLE", this.form.value.title);
    localStorage.setItem("BOOK_ISBN",this.form.value.isbn );
    this.router.navigateByUrl('/genrecreate')
  }

  createPublisher(){
    localStorage.setItem("BOOK_TITLE", this.form.value.title);
    localStorage.setItem("BOOK_ISBN",this.form.value.isbn );
    this.router.navigateByUrl('/publishercreate')
  }


  getAuthors(){
    this.RetrieveService.getauthors()
    .subscribe((author:getAuthorI) => {(this.authors = author)})
  }

  getGenres(){
    this.RetrieveService.getgenres()
    .subscribe((genre:getGenreI) => {(this.genres = genre)})
  }
  getPublishers(){
    this.RetrieveService.getpublishers()
    .subscribe((publisher:getPublisherI) => {(this.publishers = publisher)})
  }


  goBack(){
    localStorage.removeItem("BOOK_TITLE");
    localStorage.removeItem("BOOK_ISBN");
    localStorage.removeItem("BOOK_PUBLISHER");
    localStorage.removeItem("BOOK_AUTHOR");
    localStorage.removeItem("BOOK_GENRES");
    localStorage.removeItem("BOOK_COMPLETE");
    this.location.back();
  }

  onCreate(form): void {
    const datenow = new Date();
    var valorComplete;
    if (form.value.complete==true){valorComplete=true}
    else{valorComplete=false}
    const book:bookI=this.book;
    book.title= form.value.title,
    book.isbn= form.value.isbn,
    book.author= form.value.author,
    book.genre= form.value.genres,
    book.publisher= form.value.publisher,
    book.complete= valorComplete,

      console.log(book)

      this.ModifyService.modifyBook(book,localStorage.getItem("BOOK_ID")).subscribe(res=>{
        console.log('Response: ',res);
        localStorage.removeItem("BOOK_TITLE");
        localStorage.removeItem("BOOK_ISBN");
        localStorage.removeItem("BOOK_PUBLISHER");
        localStorage.removeItem("BOOK_AUTHOR");
        localStorage.removeItem("BOOK_GENRES");
        localStorage.removeItem("BOOK_COMPLETE");
        this.location.back();
        },(err:any) =>{
          console.log ('Error al cargar libro.');
          console.log(err.statusText, err.status);
          if (err.status === 409){
            this.form.controls['isbn'].setErrors({invalid:true});
          }})
        }


}
