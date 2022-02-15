import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { newsI } from '../models/news';

@Component({
  selector: 'app-newdetail',
  templateUrl: './newdetail.component.html',
  styleUrls: ['./newdetail.component.css']
})
export class NewdetailComponent implements OnInit {

  news:newsI;
  newstext:String;

  constructor(private RetrieveService:RetrieveService) { }

  ngOnInit(): void {
    this.getNewByID();
  }

  getNewByID(){

    this.RetrieveService.getNewByID(localStorage.getItem("NEW_ID"))
    .subscribe((news:newsI) => (this.news = news))
  }
}
