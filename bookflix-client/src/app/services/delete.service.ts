import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { trailerI, trailerDeleteI } from '../models/trailer';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {authorI} from '../models/author'
import {publisherI} from '../models/publisher'
import {genreI} from '../models/genre'
import {newsI} from '../models/news'
import {bookI, favouriteI} from '../models/book'
import {Router} from '@angular/router';
import { reviewDeleteI } from '../models/review';
import { profileDeleteI } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  SERVER = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) { }

  newsDelete(id:string){
    return this.httpClient.delete(`${this.SERVER}/news/${id}`);
      }

  trailerDelete(trailer:trailerDeleteI){
    return this.httpClient.request('delete', 'http://localhost:3000/api/trailers/', { body: trailer })

  }

  reviewDelete(review:reviewDeleteI){
    return this.httpClient.request('delete', 'http://localhost:3000/api/reviews/', { body: review })

  }

  profileDelete(user_id,profile_id){
    return this.httpClient.delete(`${this.SERVER}/users/${user_id}/${profile_id}`);
  }

  favouriteDelete(favourite:favouriteI,book_id:string){
    return this.httpClient.request('delete', `http://localhost:3000/api/favourites/${book_id}`, { body: favourite })
  }

  userDelete(id:string){
    return this.httpClient.delete(`${this.SERVER}/users/${id}`);
  }


  bookDelete(id:String){
    return this.httpClient.delete(`${this.SERVER}/books/${id}`);

  }

  coverDelete(id:String){
    return this.httpClient.delete(`${this.SERVER}/files/cover/${id}`);
  }

  authorDelete(id:String){
    return this.httpClient.delete(`${this.SERVER}/authors/${id}`);

  }

  genreDelete(id:String){
    return this.httpClient.delete(`${this.SERVER}/genres/${id}`);

  }

  publisherDelete(id:String){
    return this.httpClient.delete(`${this.SERVER}/publishers/${id}`);

  }

  fileDelete(id:string){
    return this.httpClient.delete(`${this.SERVER}/bookfiles/${id}`);
  }



}
