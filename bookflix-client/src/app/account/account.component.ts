import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Event, Router} from '@angular/router';
import { DeleteService } from '../services/delete.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private DeleteService:DeleteService) {
  }

  ngOnInit(): void {
  }

  deleteAccount(){
    var id=localStorage.getItem("USER_ID")
    var conf = confirm ("Está seguro que quiere borrar su cuenta? Esta acción no se puede revertir");
    if (conf){
      console.log("Cuenta borrada");
      this.DeleteService.userDelete(id).subscribe((res) => {
        console.log('Response:', res);
        this.router.navigateByUrl('/auth/register');
        localStorage.clear();
      })
    }else{
      console.log("Cancelado.")
    }
  }
}
