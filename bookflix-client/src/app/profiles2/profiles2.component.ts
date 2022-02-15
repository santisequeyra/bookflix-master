import {Component, OnInit} from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { UserI } from '../models/user';
import { Router } from '@angular/router';
import { profileCreateI, profileDeleteI } from '../models/account';
import { DeleteService } from '../services/delete.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';


@Component({
  selector: 'app-profiles2',
  templateUrl: './profiles2.component.html',
  styleUrls: ['./profiles2.component.css']
})
export class Profiles2Component implements OnInit {

  constructor(
    private RetrieveService:RetrieveService,
    private router:Router,
    private DeleteService:DeleteService,
    private location:Location,
    private formBuilder: FormBuilder,
    private createService: CreateService) { }

  user: UserI;
  maxProfiles;
  usedProfiles;
  form:FormGroup;
  creation:boolean=false;

  ngOnInit(): void {
    this.getUserByID();
    this.form = this.formBuilder.group({
      profile: [null, [Validators.required]],

    })

  }

  onCreate(form){

    const profile: profileCreateI = {
      user_id:localStorage.getItem("USER_ID"),
      profile:form.value.profile,
    }

    this.createService.profileCreate(profile).subscribe((res) => {
      console.log('Response:', res);
      location.reload();
    });
  }

  saveProfile(id,num){
    localStorage.setItem("PROFILE_ID",id );
    localStorage.setItem("PROFILE_NUMBER", num);
    this.router.navigateByUrl('/home');

  }

  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID"))
    .subscribe((user:UserI) => {
      this.user = user;
      this.usedProfiles=user.account.profiles.length;
      if(user.account.plan=="STANDARD"){
        this.maxProfiles=2
      }
      else {
        if(user.account.plan=="PREMIUM"){
          this.maxProfiles=4;
        }
      }
      console.log("Perfiles Permitidos: "+this.maxProfiles)
      console.log("Perfiles Usados: "+this.usedProfiles)
    })
  }

  createProfile(){
    console.log("añadir perfil")
    this.creation=true;
  }

  deleteProfile(profile_id){
    console.log("borrar perfil");
    var conf = confirm("Está seguro de borrar el perfil?");
    if(conf){
        var user_id=localStorage.getItem("USER_ID");
        var prof_id=profile_id;
        this.DeleteService.profileDelete(user_id,prof_id).subscribe(res=>{
        console.log('Response: ', res);
        location.reload();
      })
    }

  }

  cancel(){
    this.creation=false;
  }


  goBack(){
    this.location.back();
  }

}
