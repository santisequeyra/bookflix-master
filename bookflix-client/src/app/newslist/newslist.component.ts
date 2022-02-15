import {Component, OnInit} from '@angular/core';
import { newsI } from '../models/news';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';

@Component({
  selector: 'app-newslist',
  templateUrl: './newslist.component.html',
  styleUrls: ['./newslist.component.css']
})
export class NewslistComponent implements OnInit {

  constructor(
    private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService ) { }


  news:newsI;
  newstext:String;

  ngOnInit(): void {
    this.getnews();
  }

  getnews(){
    this.RetrieveService.getnews()
    .subscribe((news:newsI) => {(this.news = news); this.newstext= JSON.stringify(this.news)})
  }

  modifyNews(id: string , title:string , description:string):void{
    localStorage.setItem('NEW_ID',id);
    localStorage.setItem("NEW_TITLE",title)
    localStorage.setItem("NEW_DESCRIPTION",description)
    this.router.navigateByUrl('/newsmodify');
    }

  detailNews(id: string):void{
      localStorage.setItem('NEW_ID',id);
      this.router.navigateByUrl('/newdetail');
    }

  deleteNews(id: string):void{
    this.DeleteService.newsDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/newslist']));
    });
  }

}

