import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { bookI } from '../models/book'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { trailerI } from '../models/trailer';

@Component({
  selector: 'app-trailerdetail',
  templateUrl: './trailerdetail.component.html',
  styleUrls: ['./trailerdetail.component.css']
})
export class TrailerdetailComponent implements OnInit {

  constructor(private location:Location, private router: Router, private RetrieveService:RetrieveService) { }

  book:bookI
  hasCover:boolean=true;
  bookID:string=localStorage.getItem("BOOK_ID")
  trailers:trailerI;

  ngOnInit(): void {
    this.getBookByID()
    this.getTrailers();
  }

  goBack(){
    this.location.back();
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      (this.book = book)
      if(book.cover==null){this.hasCover=false}})
  }

  getTrailers(){
    this.RetrieveService.getTrailers().subscribe((trailers:trailerI) => {
      this.trailers=trailers})

  }



}
