import {Component, OnInit} from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { AccountI } from '../models/account';
import { UserI } from '../models/user';

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.css']
})
export class AccountdetailsComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService ) { }
  user: UserI;
  ultimos4:any;

  ngOnInit(): void {
    this.getUserByID();
  }


  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID"))
    .subscribe((user:UserI) => {
    this.user = user;
    this.ultimos4 = user.account.credit_card.number.substr(-4);
  });
  }


  };
