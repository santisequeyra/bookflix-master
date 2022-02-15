import {Component, OnInit} from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { RetrieveService } from '../services/retrieve.service'
import { AuthService } from '../services/auth.service'
import { AccountI } from '../models/account';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateService } from '../services/create.service';
import { PasswordI, UserI } from '../models/user';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private RetrieveService:RetrieveService,private formBuilder: FormBuilder, private router: Router, private createService: CreateService, private authService:AuthService) { }
  user:UserI; form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      previous_password: [null, [Validators.required]],
      new_password:[null, [Validators.required, Validators.minLength(8)]],
    });
  }

  onChange(form): void {
    const password: PasswordI = {
      user_id: localStorage.getItem("USER_ID"),
      previous_password: form.value.previous_password,
      new_password: form.value.new_password,
    };

    this.authService.changePassword(password).subscribe((res) => {
      console.log('Response:', res);
      this.router.navigateByUrl('/account')},
      (err:any) =>{
        console.log ('Error al cambiar pass.');
        console.log(err.statusText, err.status);
        if (err.status === 401){
          this.form.controls['previous_password'].setErrors({invalid:true});}
    });

  }





}
