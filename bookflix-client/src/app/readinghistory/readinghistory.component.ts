import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RetrieveService } from '../services/retrieve.service'
import { UserI } from '../models/user';
import { bookI } from '../models/book';
import { ReadingBookI } from '../models/account';
import { ModifyService } from '../services/modify.service';


@Component({
  selector: 'app-readinghistory',
  templateUrl: './readinghistory.component.html',
  styleUrls: ['./readinghistory.component.css']
})
export class ReadinghistoryComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService, private Router:Router, private ModifyService:ModifyService) {}

  vacio:boolean=false;
  user:UserI
  profilenumber:string;
  book:bookI;
  j=0;


  ngOnInit(): void {

    this.getUserByID();
    this.profilenumber=(localStorage.getItem("PROFILE_NUMBER"));

  }




  finishReading(id){
    const readingBook: ReadingBookI = {
      user_id:localStorage.getItem("USER_ID"),
      book_id:id,
      profile_id:localStorage.getItem("PROFILE_ID"),
      current_page:0 ,
      };

      this.ModifyService.addTimesRead(id).subscribe((res)=>{
        console.log("Cuenta aumentada correctamente")
      })

    this.ModifyService.addReadingBook(readingBook).subscribe(res=>
      {


        this.Router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.Router.navigate(['/readinghistory']));
      }
      )



  }




  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID")).subscribe((user:UserI) =>
    {
      this.user=user
      if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].readings[0]==undefined){
        this.vacio=true;
      }
    }
    )
  }




}




