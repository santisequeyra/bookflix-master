import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserI } from '../models/user';
import { RxwebValidators, file, date } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-createdaccounts',
  templateUrl: './createdaccounts.component.html',
  styleUrls: ['./createdaccounts.component.css']
})
export class CreatedaccountsComponent implements OnInit {


  form:FormGroup;
  user:UserI;
  searched:boolean=false;

  constructor(private router: Router, private formBuilder: FormBuilder, private RetrieveService:RetrieveService, private location:Location) {
  }


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      date_from:[{value:"2000-01-01",disabled:false},[Validators.required, RxwebValidators.date]],
      date_to:[{value:"2050-01-01",disabled:false},[Validators.required, RxwebValidators.date]],
    })
  }


  onSearch(form){
    var date_from_string=new Date(form.value.date_from).toISOString();
    var date_from_day=date_from_string.substr(8,2)
    var date_from_month=date_from_string.substr(5,2)
    var date_from_year=date_from_string.substr(0,4)
    var date_from=(date_from_day+"-"+date_from_month+"-"+date_from_year)

    var date_to_string=new Date(form.value.date_to).toISOString();
    var date_to_day=date_to_string.substr(8,2)
    var date_to_month=date_to_string.substr(5,2)
    var date_to_year=date_to_string.substr(0,4)
    var date_to=(date_to_day+"-"+date_to_month+"-"+date_to_year);

    console.log("FROM: "+date_from);
    console.log("TO: "+date_to);
    this.RetrieveService.searchUser(date_from,date_to).subscribe((user:UserI) => {
      this.user=user
      this.searched=true;
    },
    (err:any) =>{
      console.log ('Error al buscar usuarios.');
      console.log(err.statusText, err.status);
      if (err.status === 400){
        this.form.controls['date_to'].setErrors({invalid:true});
      }})

  }


  searchAgain(){
    this.searched=false;
  }
}
