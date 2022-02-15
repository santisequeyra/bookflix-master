import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import {Router} from '@angular/router';
import { reviewCreateI } from '../models/review';
import { RetrieveService } from '../services/retrieve.service'
import { ModifyService } from '../services/modify.service'
import { bookI } from '../models/book';
import { CreateService } from '../services/create.service';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,private createService: CreateService,private router: Router, private formBuilder: FormBuilder, private location:Location) { }


  form:FormGroup;
  score=0;
  book:bookI;

  ngOnInit(): void {
    this.getBookByID();
    this.form = this.formBuilder.group({
      rating:[null,Validators.required],
      title:["",],
      description:["",],
      spoiler:[false,]
    });

  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book = book

    })
  }

  onCreate(form){
    if(form.value.spoiler=="null"){
      this.form.controls['rating'].setErrors({invalid:true});
    }
    else{
      var bookID=localStorage.getItem("BOOK_ID");
      var profileID=localStorage.getItem("PROFILE_ID");
      const review: reviewCreateI = {
        title:form.value.title,
        description:form.value.description,
        rating:form.value.rating,
        book:bookID,
        spoiler:form.value.spoiler,
        profile:profileID,
      }
      this.createService.reviewCreate(review).subscribe(res=>{
        console.log('Response: ',res);
        this.location.back();
      })
    }
  }

  goBack(){
    this.location.back();
  }


}
