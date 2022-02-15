import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RetrieveService } from '../services/retrieve.service'
import { UserI } from '../models/user';
import { getFavouriteI, bookI, favouriteI } from '../models/book';
import { DeleteService } from '../services/delete.service';


@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,private router: Router, private location:Location, private DeleteService:DeleteService) { }

  user:UserI;
  profileName:string;
  profileNumber:string=localStorage.getItem("PROFILE_NUMBER");
  date
  favourites:bookI;
  vacio:boolean=false;

  ngOnInit(): void {
    this.getUserByID();
    this.getFavourites();
    this.date=new Date().toISOString()

  }

  getFavourites(){
    var profile_id=localStorage.getItem("PROFILE_ID")
    this.RetrieveService.getFavourites(profile_id).subscribe((favourites:bookI)=>{
      this.favourites=favourites
      if(favourites[0]==undefined){
        this.vacio=true;
      }
    })

  }

  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID")).subscribe((user:UserI)=> {
      this.user =user;
      this.profileName=user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].name
    })
  }

  toggleFavourite(b_id){
    const favourite:favouriteI={
      user_id:localStorage.getItem("USER_ID"),
      profile_id:localStorage.getItem("PROFILE_ID"),
    }
    var book_id=b_id;
    this.DeleteService.favouriteDelete(favourite,book_id).subscribe((res) => {
      console.log('Response:', res);
      location.reload();
      },
      (err)=>{
        console.log(err)
      });
  }

  goBack(){
    this.location.back();
  }

}
