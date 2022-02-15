import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CreateService} from '../services/create.service'
import { Location } from '@angular/common';
import { genreI } from '../models/genre'

@Component({
  selector: 'app-genrecreate',
  templateUrl: './genrecreate.component.html',
  styleUrls: ['./genrecreate.component.css']
})
export class GenrecreateComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private createService: CreateService, private location:Location) {
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  onCreate(form): void {

    const genre: genreI = {
      name: form.value.name,
      };

      this.createService.genrecreate(genre).subscribe(res=> {
        console.log('Response:', res)
        this.location.back()},
       (err:any) =>{
        console.log ('Error al crear género.');
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
