import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { newsI } from '../models/news';
import { ModifyService } from '../services/modify.service';
import { RetrieveService } from '../services/retrieve.service'
import { NewslistComponent } from '../newslist/newslist.component';
@Component({
  selector: 'app-newsmodify',
  templateUrl: './newsmodify.component.html',
  styleUrls: ['./newsmodify.component.css']
})
export class NewsmodifyComponent implements OnInit {

  form: FormGroup;
  news:newsI;
  novedad:string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private createService: CreateService, private ModifyService: ModifyService, private RetrieveService:RetrieveService) { }

  ngOnInit(): void {
    this.getNewByID();
    this.form = this.formBuilder.group({
      title:[localStorage.getItem("NEW_TITLE"), Validators.required],
      description:[localStorage.getItem("NEW_DESCRIPTION"), Validators.maxLength(700)],
    });

}

  onCreate(form): void {
    const datenow = new Date();
    const fecha = datenow.getTime();
    const news: newsI = {
      title: form.value.title,
      description: form.value.description,
      date: datenow,
    };

    var ID=localStorage.getItem('NEW_ID')

    this.ModifyService.newsOverwrite(news, ID).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/newslist');

  });
}
getNewByID(){

  this.RetrieveService.getNewByID(localStorage.getItem("NEW_ID"))
  .subscribe((news:newsI) => {
    this.news = news;
    localStorage.setItem("NEW_TITLE",news.title)
    localStorage.setItem("NEW_DESCRIPTION",news.description)
  })
}

}
