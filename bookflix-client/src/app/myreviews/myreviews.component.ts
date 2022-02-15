import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RetrieveService } from '../services/retrieve.service'
import { UserI } from '../models/user';
import { reviewDeleteI } from '../models/review';
import { DeleteService } from '../services/delete.service';


@Component({
  selector: 'app-myreviews',
  templateUrl: './myreviews.component.html',
  styleUrls: ['./myreviews.component.css']
})
export class MyreviewsComponent implements OnInit {

  constructor(private location:Location,private router:Router, private RetrieveService:RetrieveService,private DeleteService:DeleteService) { }

  vacio:boolean=false;
  user:UserI;
  profileName:string;
  profileNumber:string=localStorage.getItem("PROFILE_NUMBER");

  ngOnInit(): void {
    this.getUserByID()
  }



  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID")).subscribe((user:UserI)=> {
      this.user =user;
      this.profileName=user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].name
      if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].reviews.length==0){
        this.vacio=true
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
      this.router.navigate(['/myreviews']));
    })};


  goBack(){
    this.location.back();
  }

}
