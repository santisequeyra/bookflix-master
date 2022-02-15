import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {authorI} from '../models/author'
import {publisherI} from '../models/publisher'
import {genreI} from '../models/genre'
import {newsI} from '../models/news'
import {bookI, bookCreateI, favouriteI} from '../models/book'
import {Router} from '@angular/router';
import { coverI } from '../models/cover';
import {trailerCreateI } from '../models/trailer';
import { pdfI, bookFileI } from '../models/pdf';
import { reviewCreateI } from '../models/review';
import { profileCreateI } from '../models/account';

@Injectable()



export class CreateService {
  SERVER = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {
  }

  authorcreate(author: authorI){
  return this.httpClient.post(`${this.SERVER}/authors`, author)
    }

  genrecreate(genre:genreI){
    return this.httpClient.post(`${this.SERVER}/genres`, genre)
  }

  publishercreate(publisher:publisherI){
    return this.httpClient.post(`${this.SERVER}/publishers`, publisher)
  }

  bookcreate(book:bookCreateI){
    return this.httpClient.post(`${this.SERVER}/books`, book)
  }

  newscreate(news:newsI){
    return this.httpClient.post(`${this.SERVER}/news`, news)
  }

  uploadCover(cover:coverI, id:string){
    return this.httpClient.post(`${this.SERVER}/files/uploads/cover/${id}`, cover)
  }

  uploadPDF(pdf:pdfI){
    return this.httpClient.post(`${this.SERVER}/files/uploads/content/`, pdf)
  }

  uploadBookFile(bookFile:bookFileI, id:string){
    return this.httpClient.post(`${this.SERVER}/bookfiles/${id}`, bookFile)
  }


  trailerCreate(trailer:trailerCreateI){
    return this.httpClient.post(`${this.SERVER}/trailers/`, trailer)

  }

  reviewCreate(review:reviewCreateI){
    return this.httpClient.post(`${this.SERVER}/reviews/`,review);
  }

  profileCreate(profile:profileCreateI){
    return this.httpClient.post(`${this.SERVER}/users/profiles`,profile);
  }

  addFavourite(favourite:favouriteI,book_id:string){
    return this.httpClient.post(`${this.SERVER}/favourites/${book_id}`,favourite);
  }
}
