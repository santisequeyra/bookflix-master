import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { reviewI } from '../models/review';
import { bookI } from '../models/book';
import { Location } from '@angular/common';


@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {


  constructor(private RetrieveService:RetrieveService, private location:Location) { }



  reviews:reviewI;
  book:bookI;
  vacio:boolean=false;
  seeSpoilers:boolean=false;



  ngOnInit(): void {
    this.getReviews();
    this.getBookByID();
  }

  toggleSpoilers(){
    if(this.seeSpoilers==false){
    this.seeSpoilers=true;
    }
    else{
      this.seeSpoilers=false;
    }
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book = book
      var total=Object.keys(book.reviews).length;
      if (total==0){
        this.vacio=true;
      }
    })
  }

  getReviews(){
    this.RetrieveService.getReviews()
    .subscribe((reviews:reviewI) => {
      this.reviews = reviews;
    })
  }

  goBack(){
    this.location.back();
  }






}
