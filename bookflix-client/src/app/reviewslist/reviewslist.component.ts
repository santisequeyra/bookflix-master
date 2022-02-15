import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RetrieveService } from '../services/retrieve.service'
import { UserI } from '../models/user';
import { reviewDeleteI, reviewI, reviewSpoilerToggleI } from '../models/review';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';

@Component({
  selector: 'app-reviewslist',
  templateUrl: './reviewslist.component.html',
  styleUrls: ['./reviewslist.component.css']
})
export class ReviewslistComponent implements OnInit {

  constructor(private location:Location,private router:Router, private RetrieveService:RetrieveService,private DeleteService:DeleteService, private ModifyService:ModifyService) { }

  vacio:boolean=false;
  reviews:reviewI;

  ngOnInit(): void {
    this.getReviews()
  }


  getReviews(){
    this.RetrieveService.getReviews()
    .subscribe((reviews:reviewI) => {
      this.reviews = reviews;
      if((reviews[0]==undefined)||(reviews[0]==null)){
        this.vacio=true;
      }

    })

  }

  deleteReview(review_id:string,book_id:string):void{
    const reviewDel:reviewDeleteI ={
      review_id:review_id,
      book_id:book_id,
    }

    this.DeleteService.reviewDelete(reviewDel).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/reviewslist']));
    })};


    toggleSpoiler(review_id:string,spoiler:boolean){
      if (spoiler){
        const reviewSpoilerToggle:reviewSpoilerToggleI ={
          review_id:review_id,
          spoiler:false,
        }
        this.ModifyService.reviewSpoilerToggle(reviewSpoilerToggle).subscribe((res)=>{
          console.log('Response:'+res);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/reviewslist']));
        })
      }
      else{
        const reviewSpoilerToggle:reviewSpoilerToggleI ={
          review_id:review_id,
          spoiler:true,
        }
        this.ModifyService.reviewSpoilerToggle(reviewSpoilerToggle).subscribe((res)=>{
          console.log('Response:'+res);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/reviewslist']));
        })
      }

    }


    goBack(){
      this.location.back();
    }

}
