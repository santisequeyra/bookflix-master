import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Event, Router} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  event: Event;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  bookInit(){
    localStorage.removeItem("BOOK_TITLE");
    localStorage.removeItem("BOOK_ISBN");
    this.router.navigateByUrl('/bookcreate')
  }

}
