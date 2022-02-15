import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { ModifyService } from '../services/modify.service'
import { bookI } from '../models/book'
import { Router } from '@angular/router';
import { ReadingBookI } from '../models/account';
import { Location } from '@angular/common';
import { DeleteService } from '../services/delete.service';

@Component({
  selector: 'app-bookdetailadmin',
  templateUrl: './bookdetailadmin.component.html',
  styleUrls: ['./bookdetailadmin.component.css']
})
export class BookdetailadminComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService, private router: Router, private ModifyService:ModifyService, private location:Location, private DeleteService:DeleteService,) { }

  book:bookI;
  hasCover:boolean = true;
  ngOnInit(): void {
    this.getBookByID();
    if(localStorage.getItem("REFRESH")=="true"){
      location.reload(true);
      localStorage.setItem("REFRESH", "false");
    }
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      (this.book = book)
      if(book.cover==null){this.hasCover=false}})
  }


  modifyBook(id: string, title:string,isbn:string, author:string, publisher:string, genre:string,complete:boolean){
    localStorage.setItem('BOOK_ID',id);
    localStorage.setItem('BOOK_TITLE',title);
    localStorage.setItem('BOOK_ISBN',isbn);
    localStorage.setItem('BOOK_AUTHOR',author);
    localStorage.setItem('BOOK_PUBLISHER',publisher);
    localStorage.setItem('BOOK_GENRES',genre);
    localStorage.setItem("BOOK_COMPLETE",String(complete))
    this.router.navigateByUrl('/bookmodify');
  }

  deleteCover(id:String){
    this.DeleteService.coverDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/bookdetailadmin']));
    });
}

  uploadFile(id: string){
    localStorage.setItem('BOOK_ID',id);

    this.router.navigateByUrl('/filelist');
  }

  uploadCover(id: string){
    localStorage.setItem('BOOK_ID',id);
    localStorage.removeItem("BASE64");
    this.router.navigateByUrl('/uploadcover');
  }

  trailerListBook(id: string){
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/trailerlistbook');
  }

  goBack(){
    this.location.back();
  }
}
