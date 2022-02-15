import {Component, OnInit} from '@angular/core';
import { bookI } from '../models/book';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { UserI } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,private router: Router,) {
  }

  books: bookI;
  user: UserI;
  profilenumber:string;
  profileName:string;
  date

  ngOnInit(): void {
    this.getBooks();
    this.getUserByID();
    this.profilenumber=(localStorage.getItem("PROFILE_NUMBER"));
  }

  getBooks(){
    this.RetrieveService.getbooks()
    .subscribe((book:bookI) => {
      (this.books = book)

      this.date=new Date().toISOString()

      })
  }

  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID")).subscribe((user:UserI)=> {
      this.user =user;
      this.profileName=user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].name
    })
  }

  getBookByID(id){
    this.RetrieveService.getBookByID(id)
    .subscribe((book:bookI) => {
      (this.books = book)

      })
    }


  openBook(id){
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/bookdetail');

  }
}
