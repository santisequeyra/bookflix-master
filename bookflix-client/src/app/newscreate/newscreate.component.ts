import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { newsI } from '../models/news';

@Component({
  selector: 'app-newscreate',
  templateUrl: './newscreate.component.html',
  styleUrls: ['./newscreate.component.css'],
})
export class NewscreateComponent implements OnInit {
  form: FormGroup;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private createService: CreateService) {}


    ngOnInit() {
      this.form = this.formBuilder.group({
        title: [null, [Validators.required]],
        description: [null , [Validators.maxLength(700)]],
      });
    }

  onCreate(form): void {
    const datenow = new Date();
    const fecha = datenow.getTime();
    const news: newsI = {
      title: form.value.title,
      description: form.value.description,
      date: datenow,
    };


  this.createService.newscreate(news).subscribe((res) => {
    console.log('Response:', res);
    this.router.navigateByUrl('/adminpanel');
  });
}
}
