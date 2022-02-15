import {Component, OnInit} from '@angular/core';
import { newsI } from '../models/news';
import { RetrieveService } from '../services/retrieve.service'
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService ) { }
  news:newsI;
  newstext:String;
  vacio:boolean=false;

  ngOnInit(): void {
    this.getnews();
  }

  getnews(){
    this.RetrieveService.getnews()
    .subscribe((news:newsI) => {
      this.news = news;
      this.newstext= JSON.stringify(this.news);
      if(news[0]===undefined){
        this.vacio=true;
      }

    })
  }

  };
