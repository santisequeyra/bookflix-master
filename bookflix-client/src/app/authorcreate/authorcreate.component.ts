import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CreateService} from '../services/create.service'
import { Location } from '@angular/common';

import { authorI } from '../models/author'
@Component({
  selector: 'app-authorcreate',
  templateUrl: './authorcreate.component.html',
  styleUrls: ['./authorcreate.component.css']
})
export class AuthorcreateComponent implements OnInit {

  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private location:Location) {
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  onCreate(form): void {

    const author: authorI = {
      name: form.value.name,
      };

      this.createService.authorcreate(author).subscribe(res=> {
        console.log('Response:', res)
       this.location.back()},
       (err:any) =>{
        console.log ('Error al crear autor.');
        console.log(err.statusText, err.status);
        if (err.status === 409){
          this.form.controls['name'].setErrors({invalid:true});
        }
      })
      }

      goBack(){
        this.location.back();
      }
  }
