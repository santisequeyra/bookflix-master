import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { RetrieveService } from '../services/retrieve.service';
import { bookI } from '../models/book';

@Component({
  selector: 'app-topbooks',
  templateUrl: './topbooks.component.html',
  styleUrls: ['./topbooks.component.css']
})
export class TopbooksComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder, private location:Location, private retrieveService:RetrieveService) { }
  base=1;
  top=100;
  searched:boolean=false;
  books:bookI;
  form: FormGroup;

  ngOnInit(): void {
    this.getTopBooks();
  }


  getTopBooks(){
    this.retrieveService.getTopBooks(this.base,this.top).subscribe((books:bookI) => {
      this.books=books
      this.searched=true;
    });
  }

  searchAgain(){
    this.searched=false;
  }

}
