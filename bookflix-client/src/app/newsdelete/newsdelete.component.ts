import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { deleteNewsI } from '../models/news'

@Component({
  selector: 'app-newsdelete',
  templateUrl: './newsdelete.component.html',
  styleUrls: ['./newsdelete.component.css']
})
export class NewsdeleteComponent implements OnInit {
  form: FormGroup;
  constructor(router:Router) { }

  ngOnInit(): void {
  }
  onDelete(form): void {

    const news: deleteNewsI = {
      id:form.value.id
      }
    }
  }
