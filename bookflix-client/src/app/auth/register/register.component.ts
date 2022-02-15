import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewUserI} from '../../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  invalidDate:boolean=false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      creditcard: [null, [Validators.required, Validators.maxLength(16), Validators.minLength(16),Validators.pattern("^[0-9]*$") ]],
      expirationMonth: [null, [Validators.required,Validators.max(12),Validators.pattern("^[0-9]*$")]],
      expirationYear: [null, [Validators.required,Validators.pattern("^[0-9]*$")]],
      ccv: [null, [Validators.required, Validators.maxLength(3), Validators.minLength(3),Validators.pattern("^[0-9]*$")]],
    });
  }

  onRegister(form): void {
    var datenow = new Date()
    var thisMonth=((datenow.getMonth() + 1) < 10 ? '0' : '') + (datenow.getMonth() + 1);
    var thisYear=new Date().getFullYear().toString().slice(-2)
    if((form.value.expirationYear==thisYear&&form.value.expirationMonth<thisMonth)||(form.value.expirationYear<thisYear)){
      this.form.controls['expirationMonth'].setErrors({invalid:true});}
    else{
    const user: NewUserI = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      credit_card: {
        number: form.value.creditcard,
        due_date: form.value.expirationMonth + '/' + form.value.expirationYear,
        code: form.value.ccv
      }
    };


    this.authService.register(user).subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    },
    (serverLoginError:any) =>{
      console.log ('Error en el registro');
      console.log(serverLoginError.statusText, serverLoginError.status);
      if (serverLoginError.status === 409){
        this.form.controls['email'].setErrors({invalid:true});
      }


    });
  }
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
