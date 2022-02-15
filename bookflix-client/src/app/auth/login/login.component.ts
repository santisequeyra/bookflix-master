import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { invalid } from '@angular/compiler/src/render3/view/util';


@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  public error: any;
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],

    });
  }

  // TODO: REVISAR EL CODIGO COMENTADO

  onLogin(form): void {

    if((form.value.email=='admin@bookflix.com') && (form.value.password=='admin1234')){
      this.router.navigateByUrl('/adminpanel');
    }
    else{
    this.authService.login(form.value).subscribe(() => {
      this.router.navigateByUrl('/profiles2');
    },
    (serverLoginError:any) =>{
      console.log ('Error en el login');
      console.log(serverLoginError.statusText, serverLoginError.status);
      if (serverLoginError.status === 409){
        this.form.controls['password'].setErrors({invalid:true});
      }
      if (serverLoginError.status === 404){
        this.form.controls['email'].setErrors({invalid:true});
      }



    })
  };
  }


}


/*
function getMonth() {
  const d = new Date();
  return d.getMonth() + 1;
}

function getYear() {
  const d = new Date();
  return parseInt(d.getFullYear().toString().substr(2, 2), 10);
}
*/



