import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { bookI } from '../models/book'

@Component({
  selector: 'app-bookdelete',
  templateUrl: './bookdelete.component.html',
  styleUrls: ['./bookdelete.component.css']
})
export class BookdeleteComponent implements OnInit {
  form: FormGroup;
  constructor(router:Router) { }

  ngOnInit(): void {
  }
  onDelete(form): void {

}
}
