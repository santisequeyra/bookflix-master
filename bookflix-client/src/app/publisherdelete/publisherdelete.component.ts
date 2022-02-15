import {Component, OnInit} from '@angular/core';
import { newsI } from '../models/news';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeleteService } from '../services/delete.service';
import { ModifyService } from '../services/modify.service';

import { publisherI } from '../models/publisher'
@Component({
  selector: 'app-publisherdelete',
  templateUrl: './publisherdelete.component.html',
  styleUrls: ['./publisherdelete.component.css']
})
export class PublisherdeleteComponent implements OnInit {


  publishers:publisherI;

  constructor(private RetrieveService:RetrieveService,
    private router: Router,
    private formBuilder: FormBuilder,
    private DeleteService:DeleteService,
    private ModifyService:ModifyService) { }

  hasBooks:boolean=false;

  ngOnInit(): void {
    this.getPublishers();
  }

  getPublishers(){
  this.RetrieveService.getpublishers()
    .subscribe((publishers:publisherI) => {
      this.publishers = publishers;
      console.log(publishers[5].books[0])
    })
  }

  deletePublisher(id: string):void{
    this.DeleteService.publisherDelete(id).subscribe((res) => {
      console.log('Response:', res);
      this.hasBooks=false;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/publisherdelete']));
    },(err:any) =>{
      console.log ('Error al borrar editorial.');
      console.log(err.statusText, err.status);
      if (err.status === 400){
        this.hasBooks=true;
      }});
  }

}

