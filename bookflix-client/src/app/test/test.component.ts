import { Component, OnInit } from '@angular/core';
import { RetrieveService} from '../services/retrieve.service';
import { authorI } from '../models/author'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TESTComponent implements OnInit {



  constructor(private RetrieveService:RetrieveService) {
  }

  ngOnInit() {

  }

}
