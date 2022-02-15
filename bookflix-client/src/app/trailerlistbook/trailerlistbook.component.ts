import {Component, OnInit} from '@angular/core';
import { trailerI, trailerDeleteI } from '../models/trailer';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';
import { bookI } from '../models/book';
import { Location } from '@angular/common';


@Component({
  selector: 'app-trailerlistbook',
  templateUrl: './trailerlistbook.component.html',
  styleUrls: ['./trailerlistbook.component.css']
})
export class TrailerlistbookComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService,
    private location:Location) { }

  vacio:boolean=false;
  trailers:trailerI;
  book:bookI;
  bookTitle:String;

  ngOnInit(): void {
    this.getTrailers();
    this.getBookByID();
  }

  getTrailers(){
    this.RetrieveService.getTrailers()
    .subscribe((trailers:trailerI) => {(this.trailers = trailers);

      if(trailers[0]===undefined){
        this.vacio=true;
      }})
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book=book
      this.bookTitle=book.title;

    })
  }

  uploadTrailer(id: string){
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/trailercreate');
  }

  deleteTrailer(t_id,b_id):void{
    const trailerDel: trailerDeleteI = {
      trailer_id: t_id,
      book_id: b_id,
    };

    this.DeleteService.trailerDelete(trailerDel).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/trailerlistbook']));
    })};

    goBack(){
      this.location.back();
    }

}
