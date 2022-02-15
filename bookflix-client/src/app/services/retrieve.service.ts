import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {authorI} from '../models/author'
import {publisherI} from '../models/publisher'
import {genreI} from '../models/genre'
import {newsI} from '../models/news'
import {bookI} from '../models/book'
import {Router} from '@angular/router';
import { NewsmodifyComponent } from '../newsmodify/newsmodify.component';

@Injectable()



export class RetrieveService {
  SERVER = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  getauthors(): Observable<any>{
    const url_api = `${this.SERVER}/authors`;
    return this.httpClient.get(url_api);
    }

  getgenres(): Observable<any>{
    const url_api = `${this.SERVER}/genres`;
    return this.httpClient.get(url_api);
  }

  getpublishers(): Observable<any>{
    const url_api = `${this.SERVER}/publishers`;
    return this.httpClient.get(url_api);
  }

  getbooks(): Observable<any>{
    const url_api = `${this.SERVER}/books`;
    return this.httpClient.get(url_api);
  }

  getBookByISBN(isbn): Observable<any>{
    const url_api = `${this.SERVER}/books/${isbn}`;
    return this.httpClient.get(url_api);
  }

  getBookByID(id): Observable<any>{
    const url_api = `${this.SERVER}/books/${id}`;
    return this.httpClient.get(url_api);
  }

  getCoverByID(id): Observable<any>{
    const url_api = `${this.SERVER}/files/downloads/cover/${id}`;
    return this.httpClient.get(url_api, {responseType:'blob'});
  }

  getnews(): Observable<any>{
    const url_api = `${this.SERVER}/news`;
    return this.httpClient.get(url_api);
}

  getReviews(): Observable<any>{
    const url_api = `${this.SERVER}/reviews`;
    return this.httpClient.get(url_api);
  }

getNewByID(id): Observable<any>{
  const url_api = `${this.SERVER}/news/${id}`;
    return this.httpClient.get(url_api);
}

  getUsers(): Observable<any>{
    const url_api = `${this.SERVER}/users`;
    return this.httpClient.get(url_api);
  }

  getUserByID(id): Observable<any>{
    const url_api = `${this.SERVER}/users/${id}`;
    return this.httpClient.get(url_api);
  }

  getUserProfiles(id): Observable<any>{
    const url_api = `${this.SERVER}/profiles/${id}`;
    return this.httpClient.get(url_api);
  }

  getAccountByID(id): Observable<any>{
    const url_api = `${this.SERVER}/accounts/${id}`;
    return this.httpClient.get(url_api);
  }


  getTrailers(): Observable<any>{
    const url_api = `${this.SERVER}/trailers`;
    return this.httpClient.get(url_api);
  }


  getTopBooks(base,top):Observable<any>{
    const url_api = `${this.SERVER}/metrics/topbooks?base=${base}&top=${top}`;
    return this.httpClient.get(url_api);
  }

  getPdfFileByID(id):Observable<any>{
    const url_api = `${this.SERVER}/files/downloads/content/${id}`;
    return this.httpClient.get(url_api);

  }

  search(title, author, genre, publisher): Observable<any>{
    const url_api = `${this.SERVER}/books/search?genre=${genre}&author=${author}&publisher=${publisher}&title=${title}`;
    return this.httpClient.get(url_api);
  }

  searchUser(from, to): Observable<any>{
    const url_api = `${this.SERVER}/metrics/users?from=${from}&to=${to}`;
    return this.httpClient.get(url_api);
  }

  getFavourites(profile_id):Observable<any>{
    return this.httpClient.get(`http://localhost:3000/api/favourites/${profile_id}`)

  }

}
