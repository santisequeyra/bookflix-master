import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { RetrieveService } from '../services/retrieve.service';
import { bookI } from '../models/book';

@Component({
  selector: 'app-searchadmin',
  templateUrl: './searchadmin.component.html',
  styleUrls: ['./searchadmin.component.css']
})
export class SearchadminComponent implements OnInit {
  form: FormGroup;
  searched:boolean=false;
  invalid:boolean=false
  books:bookI;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private location:Location, private retrieveService:RetrieveService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ["", [Validators.minLength(2)]],
      author: ["", [Validators.minLength(2)]],
      genre: ["", [Validators.minLength(2)]],
      publisher: ["", [Validators.minLength(2)]],
    });
  }

  onSearch(form): void {
    var title = form.value.title;
    var author = form.value.author;
    var genre = form.value.genre;
    var publisher = form.value.publisher;
    if ((title=='')&&(author=='')&&(genre=='')&&(publisher=='')){
      this.invalid=true;
    }else{
      this.retrieveService.search(title,author,genre,publisher).subscribe((books:bookI) => {
        this.invalid=false;
        this.books=books
        this.searched=true;

      })
    };
}

openBook(id){
  localStorage.setItem('BOOK_ID',id);
  this.router.navigateByUrl('/bookdetailadmin');

}

searchAgain(){
  this.searched=false;
}





}
