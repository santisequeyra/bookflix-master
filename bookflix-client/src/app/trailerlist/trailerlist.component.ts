import {Component, OnInit} from '@angular/core';
import { trailerI, trailerDeleteI } from '../models/trailer';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';
import { bookI } from '../models/book';

@Component({
  selector: 'app-trailerlist',
  templateUrl: './trailerlist.component.html',
  styleUrls: ['./trailerlist.component.css']
})
export class TrailerlistComponent implements OnInit {

  constructor(
    private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService) { }


  trailers:trailerI;
  books:bookI;
  bookTitle:String="aa";
  trailer:trailerI;
  vacio:boolean=false;

  ngOnInit(): void {
    this.getTrailers();
    this.getBooks()
  }

  getTrailers(){
    this.RetrieveService.getTrailers()
    .subscribe((trailers:trailerI) => {(this.trailers = trailers);

      if(trailers[0]===undefined){
        this.vacio=true;
      }})
  }

  deleteTrailer(t_id,b_id):void{
    const trailerDel: trailerDeleteI = {
      trailer_id: t_id,
      book_id: b_id,
    };

    this.DeleteService.trailerDelete(trailerDel).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/trailerlist']));
    })};

  getBooks(){
    this.RetrieveService.getbooks()
    .subscribe((books:bookI) => {(this.books = books);})
  }

  getBookTitle(id:string){
    this.RetrieveService.getBookByID(id).subscribe((book:bookI) => {(this.bookTitle = book.title);})


  }
}
