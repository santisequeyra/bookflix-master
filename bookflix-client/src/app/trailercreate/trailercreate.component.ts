import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import {trailerCreateI } from '../models/trailer';
import { Location } from '@angular/common'


@Component({
  selector: 'app-trailercreate',
  templateUrl: './trailercreate.component.html',
  styleUrls: ['./trailercreate.component.css']
})
export class TrailercreateComponent implements OnInit {

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private createService: CreateService, private location: Location) { }


    form: FormGroup;

    ngOnInit() {
      this.form = this.formBuilder.group({
        title: [null, [Validators.required]],
        description: ["" ,],
      });
    }

    onCreate(form): void {
      const trailer: trailerCreateI = {
        title: form.value.title,
        description: form.value.description,
        book: localStorage.getItem("BOOK_ID"),
      };

    this.createService.trailerCreate(trailer).subscribe((res) => {
        console.log('Response:', res);
        this.location.back();
    });
  }

  goBack(){
    this.location.back();
  }

}
