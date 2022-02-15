import { Component, OnInit } from '@angular/core';
import { RetrieveService } from '../services/retrieve.service'
import { ModifyService } from '../services/modify.service'
import { bookI, favouriteI } from '../models/book'
import { Router } from '@angular/router';
import { ReadingBookI } from '../models/account';
import { Location } from '@angular/common';
import { UserI } from '../models/user';
import { CreateService } from '../services/create.service';
import { DeleteService } from '../services/delete.service';



@Component({
  selector: 'app-bookdetail',
  templateUrl: './bookdetail.component.html',
  styleUrls: ['./bookdetail.component.css']
})
export class BookdetailComponent implements OnInit {

  constructor(
    private RetrieveService:RetrieveService,
    private router: Router,
    private ModifyService:ModifyService,
    private location:Location,
    private CreateService:CreateService,
    private DeleteService:DeleteService) { }


  hasCover = true;
  book:bookI;
  trailerID:[string];
  currentPage:number
  isStarted:boolean=false;
  user:UserI;
  available:boolean=true;
  dateBook
  pdfID:string;
  selected:boolean=false;
  hasFiles:boolean=false;
  rating
  isfavourite:boolean=false;
  reviewed:boolean=false;
  read:boolean=false;

  ngOnInit(): void {
    this.getBookByID();
    this.getUserByID();
  }

  getBookByID(){
    this.RetrieveService.getBookByID(localStorage.getItem("BOOK_ID"))
    .subscribe((book:bookI) => {
      this.book = book
      this.pdfID=book.file[0].fileId
      if((book.file[0]!==undefined)&&(book.file[0]!==null)&&(book.file!==null)){this.hasFiles=true}
      if(book.cover==null){this.hasCover=false}
      var sumador:number=0;
      var total=Object.keys(book.reviews).length;
      for(var i=0; i<total;i++){
        sumador=sumador+book.reviews[i].rating
      }
      if ((sumador==0)&&(i==0)){
        this.rating=0;
      }
      else{
        this.rating=sumador/i;
      }
    })
  }

 getUserByID(){
  this.RetrieveService.getUserByID(localStorage.getItem("USER_ID"))
  .subscribe((user:UserI) => {
    this.user= user
    var cantidadFavoritos = Object.keys(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].favourites).length
    var cantidadReviews = Object.keys(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].reviews).length
    var cantidadLeidos = Object.keys(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].readings).length
    //si está en favoritos lo marca
    for(var j=0;j<cantidadFavoritos;j++){
      if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].favourites[j]==localStorage.getItem("BOOK_ID")){
        this.isfavourite=true;
      }
    }
    //si ya escribió review lo marca
    for(var k=0;k<cantidadReviews;k++){
      if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].reviews[k].book._id==localStorage.getItem("BOOK_ID")){
        this.reviewed=true;
      }
    }

    //si lo terminó de leer lo marca
    for(var i=0;i<cantidadLeidos;i++){
      if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].readings[i].book._id==localStorage.getItem("BOOK_ID")){
        if(user.account.profiles[localStorage.getItem("PROFILE_NUMBER")].readings[i].current_page==0){
        this.read=true;
        console.log("LEIDO Y TERMINADO")
        }else{
          console.log("LEIDO PERO NO TERMINADO")
        }
      }
    }

   })


 }

  readBook(){


    if(this.isStarted && this.currentPage>0){
    const readingBook: ReadingBookI = {
      user_id:localStorage.getItem("USER_ID"),
      book_id:localStorage.getItem("BOOK_ID"),
      profile_id:localStorage.getItem("PROFILE_ID"),
      current_page:this.currentPage ,

      };

    this.ModifyService.addReadingBook(readingBook).subscribe(res=>
      {
      localStorage.setItem("PDF_ID",this.pdfID)
      this.router.navigateByUrl('/readbook');
      }
      )
    }
    else{
      const readingBook: ReadingBookI = {
        user_id:localStorage.getItem("USER_ID"),
        book_id:localStorage.getItem("BOOK_ID"),
        profile_id:localStorage.getItem("PROFILE_ID"),
        current_page:1 ,

        };

      this.ModifyService.addReadingBook(readingBook).subscribe(res=>
        {
          localStorage.setItem("PDF_ID",this.pdfID)
          this.router.navigateByUrl('/readbook');
        }
        )
      }
    }



    chapterList(){
    localStorage.setItem("BOOK_ID",this.book._id);
    this.router.navigateByUrl("/chapterlist")
  }


  addReview(){
    this.router.navigateByUrl('/addreview');
  }


  toggleFavourite(){
    const favourite:favouriteI={
      user_id:localStorage.getItem("USER_ID"),
      profile_id:localStorage.getItem("PROFILE_ID"),
    }
    var book_id=localStorage.getItem("BOOK_ID");
    if(this.isfavourite){
      this.DeleteService.favouriteDelete(favourite,book_id).subscribe((res) => {
        console.log('Response:', res);
        this.isfavourite=false;
        location.reload();
      },
      (err)=>{
        console.log(err)
      });
    }
    else{
      this.CreateService.addFavourite(favourite,book_id).subscribe((res)=>{
        console.log('Response:',res);
        this.isfavourite=true;
        location.reload();
      })
      //guardar en perfil
    }
  }

  seeTrailers(){
    this.router.navigateByUrl('/trailerdetail');
  }

  seeReviews(){
    this.router.navigateByUrl('/reviews');
  }

  goBack(){
    this.location.back();
  }
}
