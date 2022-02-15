import {Component, OnInit} from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { RetrieveService } from '../services/retrieve.service'
import { AuthService } from '../services/auth.service'
import { AccountI, changePlanI } from '../models/account';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { PasswordI, NewCreditCardI, UserI } from '../models/user';
import { ModifyService } from '../services/modify.service';


@Component({
  selector: 'app-changesubscription',
  templateUrl: './changesubscription.component.html',
  styleUrls: ['./changesubscription.component.css']
})
export class ChangesubscriptionComponent implements OnInit {

  constructor(
    private RetrieveService:RetrieveService,
    private formBuilder: FormBuilder,
    private router: Router,
    private createService: CreateService,
    private authService:AuthService,
    private modifyService:ModifyService) { }

  user:UserI;
  form: FormGroup;
  activePlan:string;
  otherPlan:string;
  error:boolean=false;
  activeProfiles

  ngOnInit(): void {
    this.getUserByID();
    this.form = this.formBuilder.group({
      newCreditCard:  [null, [Validators.required, Validators.maxLength(16), Validators.minLength(16),Validators.pattern("^[0-9]*$") ]],
      newExpirationMonth:[null, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.max(12)]],
      newExpirationYear:[null, [Validators.required, Validators.min(getYear()),Validators.pattern("^[0-9]*$")]],
      newCCV:[null, [Validators.required, Validators.maxLength(3), Validators.minLength(3),Validators.pattern("^[0-9]*$")]],
      isPremium:[null],
    });
  }

  changePlan(){
    if (this.activePlan=="PREMIUM"){
     if(this.activeProfiles>2){
      this.error=true
     }
     else{
       this.error=false;
       if(this.activeProfiles<3){
        const changePlan: changePlanI = {
          user_id:localStorage.getItem("USER_ID"),
          plan:"STANDARD",
        }
        this.modifyService.changePlan(changePlan).subscribe(res=>{
          console.log('Response: ', res);
          location.reload();

        })
       }
     }
    }
     else{
      this.error=false;
       if(this.activePlan=="STANDARD")
       {
        const changePlan: changePlanI = {
          user_id:localStorage.getItem("USER_ID"),
          plan:"PREMIUM",
        }
        this.modifyService.changePlan(changePlan).subscribe(res=>{
          console.log('Response: ',res);
          location.reload();

        })

       }
     }
    }






  getUserByID(){
    this.RetrieveService.getUserByID(localStorage.getItem("USER_ID"))
    .subscribe((user:UserI) => {
      (this.user = user)
      this.activeProfiles=user.account.profiles.length;
      if(user.account.plan=="STANDARD"){
        this.activePlan="STANDARD";
        this.otherPlan="PREMIUM";
        console.log("Perfiles maximos: 2")
      }else{
        if(user.account.plan=="PREMIUM"){
          this.activePlan="PREMIUM";
          this.otherPlan="STANDARD"
          console.log("Perfiles maximos: 4")
        }
      }
      console.log("Perfiles activos:"+user.account.profiles.length)
    })
  }

  onChange(form): void {
    const creditcard: NewCreditCardI = {
      user_id:localStorage.getItem("USER_ID"),
      credit_card:{
        number: form.value.newCreditCard,
        due_date: form.value.newExpirationMonth + '/' + form.value.newExpirationYear,
        code: form.value.newCCV
      }
    }



    this.authService.changeCreditCard(creditcard, localStorage.getItem("USER_ID")).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/account');
    });

    }


  }

  function getMonth() {
    // @ts-ignore
    const d = new Date();
    return d.getMonth() + 1;
  }

  function getYear() {
    // @ts-ignore
    const d = new Date();
    // @ts-ignore
    return parseInt(d.getFullYear().toString().substr(2, 2), 10);
}
