import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {RouterModule} from "@angular/router";
import {AuthModule} from "./auth/auth.module";
import { HomeComponent } from './home/home.component';
import { HelpComponent } from './help/help.component';
import { ContactusComponent } from './contactus/contactus.component';
import { TermsComponent } from './terms/terms.component';
import { Page404Component } from './page404/page404.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { NewsComponent } from './news/news.component';
import { Profiles2Component } from './profiles2/profiles2.component';
import { Profiles4Component } from './profiles4/profiles4.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { CommonModule }                             from '@angular/common';
import { FormsModule, ReactiveFormsModule }         from '@angular/forms';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators"
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangesubscriptionComponent } from './changesubscription/changesubscription.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookcreateComponent } from './bookcreate/bookcreate.component';
import { BookmodifyComponent } from './bookmodify/bookmodify.component';
import { BookdeleteComponent } from './bookdelete/bookdelete.component';
import { GenrecreateComponent } from './genrecreate/genrecreate.component';
import { GenredeleteComponent } from './genredelete/genredelete.component';
import { AuthorcreateComponent } from './authorcreate/authorcreate.component';
import { AuthordeleteComponent } from './authordelete/authordelete.component';
import { PublishercreateComponent } from './publishercreate/publishercreate.component';
import { PublisherdeleteComponent } from './publisherdelete/publisherdelete.component';
import { NewslistComponent } from './newslist/newslist.component';
import { NewscreateComponent } from './newscreate/newscreate.component';
import { NewsdeleteComponent } from './newsdelete/newsdelete.component';
import { CreateService } from './services/create.service';
import { HttpClientModule } from '@angular/common/http';
import { RetrieveService } from './services/retrieve.service';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { NewsmodifyComponent } from './newsmodify/newsmodify.component';
import { DeleteService } from './services/delete.service';
import { ModifyService } from './services/modify.service';
import { NewdetailComponent } from './newdetail/newdetail.component';
import { TrailerlistComponent } from './trailerlist/trailerlist.component';
import { TrailercreateComponent } from './trailercreate/trailercreate.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { TrailerdetailComponent } from './trailerdetail/trailerdetail.component';
import { ReadinghistoryComponent } from './readinghistory/readinghistory.component';
import { UploadtrailerComponent } from './uploadtrailer/uploadtrailer.component';
import { UploadcoverComponent } from './uploadcover/uploadcover.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { BookdetailadminComponent } from './bookdetailadmin/bookdetailadmin.component';
import { SearchadminComponent } from './searchadmin/searchadmin.component';
import { TrailerlistbookComponent } from './trailerlistbook/trailerlistbook.component';
import { FilelistComponent } from './filelist/filelist.component';
import { ReadbookComponent } from './readbook/readbook.component';
import { PdfViewerModule } from 'ng2-pdf-viewer'
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChapterlistComponent } from './chapterlist/chapterlist.component';
import { TopbooksComponent } from './topbooks/topbooks.component';
import { CreatedaccountsComponent } from './createdaccounts/createdaccounts.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewslistComponent } from './reviewslist/reviewslist.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HelpComponent,
    ContactusComponent,
    TermsComponent,
    Page404Component,
    RecommendedComponent,
    NewsComponent,
    Profiles2Component,
    Profiles4Component,
    AccountComponent,
    SearchComponent,
    AdminPanelComponent,
    ChangepasswordComponent,
    ChangesubscriptionComponent,
    MyreviewsComponent,
    BooklistComponent,
    BookcreateComponent,
    BookmodifyComponent,
    BookdeleteComponent,
    GenrecreateComponent,
    GenredeleteComponent,
    AuthorcreateComponent,
    AuthordeleteComponent,
    PublishercreateComponent,
    PublisherdeleteComponent,
    NewslistComponent,
    NewscreateComponent,
    NewsdeleteComponent,
    AccountdetailsComponent,
    NewsmodifyComponent,
    NewdetailComponent,
    TrailerlistComponent,
    TrailercreateComponent,
    FileuploadComponent,
    BookdetailComponent,
    TrailerdetailComponent,
    ReadinghistoryComponent,
    UploadtrailerComponent,
    UploadcoverComponent,
    UploadfileComponent,
    BookdetailadminComponent,
    SearchadminComponent,
    TrailerlistbookComponent,
    FilelistComponent,
    ReadbookComponent,
    ChapterlistComponent,
    TopbooksComponent,
    CreatedaccountsComponent,
    AddReviewComponent,
    MyFavouritesComponent,
    ReviewsComponent,
    ReviewslistComponent,
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    AuthModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/auth', pathMatch: 'full' },
      { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }
    ])
  ],
  providers: [CreateService, RetrieveService, DeleteService,ModifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
