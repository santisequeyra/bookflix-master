import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {authorI} from '../models/author'
import {publisherI} from '../models/publisher'
import {genreI} from '../models/genre'
import {newsI} from '../models/news'
import {bookI, bookModifyI, modifyComplete} from '../models/book'
import {Router} from '@angular/router';
import { NewsmodifyComponent } from '../newsmodify/newsmodify.component';
import { ReadingBookI } from '../models/account';
import { bookFileI } from '../models/pdf';
import { changePlanI } from '../models/account'
import { reviewSpoilerToggleI } from '../models/review';
@Injectable({
  providedIn: 'root'
})
export class ModifyService {
  SERVER = 'http://localhost:3000/api';


  constructor(private httpClient: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  addTimesRead(id:string){
    return this.httpClient.post(`${this.SERVER}/books/${id}`,"as")
  }

  newsOverwrite(news:newsI, ID:string){

    return this.httpClient.put(`${this.SERVER}/news/${ID}`, news)
  }

  addReadingBook(readingBook:ReadingBookI){
    return this.httpClient.put(`${this.SERVER}/users/readings`, readingBook)
  }

  modifyBook(book:bookI, ID:string){
    return this.httpClient.put(`${this.SERVER}/books/${ID}`, book)
  }

  changeDates(bookFile:bookFileI, ID:string){
    return this.httpClient.put(`${this.SERVER}/bookfiles/${ID}`, bookFile)
  }

  changePlan(changeplan:changePlanI){
    return this.httpClient.put(`${this.SERVER}/users/plan/`, changeplan)
  }

  reviewSpoilerToggle(review:reviewSpoilerToggleI){
    return this.httpClient.put(`${this.SERVER}/reviews/`, review)
  }




}
