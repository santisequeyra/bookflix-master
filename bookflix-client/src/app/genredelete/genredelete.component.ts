import {Component, OnInit} from '@angular/core';
import { newsI } from '../models/news';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';

import { genreI } from '../models/genre'

@Component({
  selector: 'app-genredelete',
  templateUrl: './genredelete.component.html',
  styleUrls: ['./genredelete.component.css']
})
export class GenredeleteComponent implements OnInit {

  genres:genreI
  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService ) { }


    hasBooks:boolean=false;

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(){
  this.RetrieveService.getgenres()
    .subscribe((genres:genreI) => {(this.genres = genres);})
  }

  deleteGenre(id: string):void{
    this.DeleteService.genreDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.hasBooks=false;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/genredelete']));
    },(err:any) =>{
      console.log ('Error al borrar género.');
      console.log(err.statusText, err.status);
      if (err.status === 400){
        this.hasBooks=true;
      }});
  }



}


