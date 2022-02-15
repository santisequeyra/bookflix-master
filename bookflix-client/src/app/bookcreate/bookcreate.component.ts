import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { CreateService} from '../services/create.service'
import { RetrieveService } from '../services/retrieve.service'

import { bookI,bookCreateI} from '../models/book';
import { authorI, getAuthorI } from '../models/author';
import { genreI, getGenreI } from '../models/genre';
import { publisherI, getPublisherI } from '../models/publisher';
import { Location } from '@angular/common';
@Component({
  selector: 'app-bookcreate',
  templateUrl: './bookcreate.component.html',
  styleUrls: ['./bookcreate.component.css']
})

export class BookcreateComponent implements OnInit {

  form: FormGroup;
  authors:getAuthorI;
  genres:getGenreI;
  publishers:getPublisherI;

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private RetrieveService:RetrieveService, private location:Location) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [localStorage.getItem("BOOK_TITLE"), [Validators.required]],
      isbn: [localStorage.getItem("BOOK_ISBN"), [Validators.required, Validators.pattern("^[0-9]*$")]],
      publisher:[localStorage.getItem("BOOK_PUBLISHER"),[Validators.required]],
      author:[localStorage.getItem("BOOK_AUTHOR"),[Validators.required]],
      genre:[localStorage.getItem("BOOK_GENRES"),[Validators.required]],
      complete:[false,]
  });

  this.getAuthors();
  this.getGenres();
  this.getPublishers();
}


createAuthor(){
  if(this.form.value.title!==null){localStorage.setItem("BOOK_TITLE", this.form.value.title)};
  if(this.form.value.isbn!==null){localStorage.setItem("BOOK_ISBN",this.form.value.isbn )};
  if(this.form.value.publisher!==null){localStorage.setItem("BOOK_PUBLISHER",this.form.value.publisher )};
  if(this.form.value.author!==null){localStorage.setItem("BOOK_AUTHOR",this.form.value.author )};
  if(this.form.value.genre!==null){localStorage.setItem("BOOK_GENRES",this.form.value.genre )};
  this.router.navigateByUrl('/authorcreate')
}

createGenre(){
  if(this.form.value.title!==null){localStorage.setItem("BOOK_TITLE", this.form.value.title)};
  if(this.form.value.isbn!==null){localStorage.setItem("BOOK_ISBN",this.form.value.isbn )};
  if(this.form.value.publisher!==null){localStorage.setItem("BOOK_PUBLISHER",this.form.value.publisher )};
  if(this.form.value.author!==null){localStorage.setItem("BOOK_AUTHOR",this.form.value.author )};
  if(this.form.value.genre!==null){localStorage.setItem("BOOK_GENRES",this.form.value.genre )};
  this.router.navigateByUrl('/genrecreate')
}

createPublisher(){
  if(this.form.value.title!==null){localStorage.setItem("BOOK_TITLE", this.form.value.title)};
  if(this.form.value.isbn!==null){localStorage.setItem("BOOK_ISBN",this.form.value.isbn )};
  if(this.form.value.publisher!==null){localStorage.setItem("BOOK_PUBLISHER",this.form.value.publisher )};
  if(this.form.value.author!==null){localStorage.setItem("BOOK_AUTHOR",this.form.value.author )};
  if(this.form.value.genre!==null){localStorage.setItem("BOOK_GENRES",this.form.value.genre )};
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


  onCreate(form): void {
    const datenow = new Date();
    var valorComplete;
    if (form.value.complete==true){valorComplete=true}
    else{valorComplete=false}
    const book: bookCreateI = {
      title: form.value.title,
      isbn: form.value.isbn,
      author: form.value.author,
      genre: form.value.genre,
      publisher: form.value.publisher,
      complete: form.value.complete,
      file:null,
      date: datenow,
      reviews:null,
      release:"",
      cover:null
      }
      console.log(book)

      this.createService.bookcreate(book).subscribe(res=>{
        console.log('Response: ',res);
        this.router.navigateByUrl('/adminpanel');
        localStorage.removeItem("BOOK_TITLE");
        localStorage.removeItem("BOOK_ISBN");
        localStorage.removeItem("BOOK_PUBLISHER");
        localStorage.removeItem("BOOK_AUTHOR");
        localStorage.removeItem("BOOK_GENRES");
        localStorage.removeItem("BOOK_COMPLETE");
      },
        (err:any) =>{
          console.log ('Error al cargar libro.');
          console.log(err.statusText, err.status);
          if (err.status === 409){
            this.form.controls['isbn'].setErrors({invalid:true});
          }})
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
}

