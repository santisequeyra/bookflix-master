import {Component, OnInit} from '@angular/core';
import { bookI } from '../models/book';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';
import { Location } from '@angular/common'

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService,
    private location:Location) { }



  books:bookI

  ngOnInit(): void {
    this.getBooks();
  }



  getBooks(){
    this.RetrieveService.getbooks()
    .subscribe((books:bookI) => {
      (this.books = books);
    })

  }

  detailBookAdmin(id: string):void{
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/bookdetailadmin');
  }

  deleteBook(id: string):void{
    this.DeleteService.bookDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/booklist']));
    });
  }

  modifyBook(id:string,title:string,isbn:string,author:string,publisher:string,genre:string,complete:boolean){
    localStorage.setItem('BOOK_ID',id);
    localStorage.setItem('BOOK_TITLE',title);
    localStorage.setItem('BOOK_ISBN',isbn);
    localStorage.setItem('BOOK_AUTHOR',author);
    localStorage.setItem('BOOK_PUBLISHER',publisher);
    localStorage.setItem('BOOK_GENRES',genre);
    localStorage.setItem("BOOK_COMPLETE",String(complete))
    this.router.navigateByUrl('/bookmodify');
  }

  uploadFile(id: string){
    localStorage.setItem('BOOK_ID',id);
    localStorage.removeItem("BASE64");
    this.router.navigateByUrl('/filelist');
  }

  uploadCover(id: string){
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/uploadcover');
  }

  deleteCover(id:String){
    this.DeleteService.coverDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/booklist']));
    });
}

  uploadTrailer(id: string){
    localStorage.setItem('BOOK_ID',id);
    this.router.navigateByUrl('/trailerlistbook');
  }
}
