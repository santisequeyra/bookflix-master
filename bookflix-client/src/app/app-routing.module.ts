import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { TermsComponent } from './terms/terms.component';
import { NewsComponent } from './news/news.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { Profiles2Component } from './profiles2/profiles2.component';
import { Profiles4Component }from './profiles4/profiles4.component';
import { AccountComponent } from './account/account.component';
import { SearchComponent } from './search/search.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangesubscriptionComponent } from './changesubscription/changesubscription.component';
import { MyreviewsComponent } from './myreviews/myreviews.component';
import { BooklistComponent } from './booklist/booklist.component';
import { BookcreateComponent } from './bookcreate/bookcreate.component';
import { BookmodifyComponent } from './bookmodify/bookmodify.component';
import { BookdeleteComponent } from './bookdelete/bookdelete.component';
import { NewslistComponent } from './newslist/newslist.component';
import { NewscreateComponent } from './newscreate/newscreate.component';
import { GenrecreateComponent } from './genrecreate/genrecreate.component';
import { GenredeleteComponent } from './genredelete/genredelete.component';
import { AuthorcreateComponent } from './authorcreate/authorcreate.component';
import { AuthordeleteComponent } from './authordelete/authordelete.component';
import { PublishercreateComponent } from './publishercreate/publishercreate.component';
import { PublisherdeleteComponent } from './publisherdelete/publisherdelete.component';
import { NewsdeleteComponent } from './newsdelete/newsdelete.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { NewsmodifyComponent } from './newsmodify/newsmodify.component';
import { TESTComponent } from './test/test.component';
import { NewdetailComponent } from './newdetail/newdetail.component';
import { TrailerlistComponent } from './trailerlist/trailerlist.component';
import { TrailercreateComponent } from './trailercreate/trailercreate.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { BookdetailComponent } from './bookdetail/bookdetail.component';
import { TrailerdetailComponent } from './trailerdetail/trailerdetail.component';
import { ReadinghistoryComponent } from './readinghistory/readinghistory.component';
import { BookdetailadminComponent } from './bookdetailadmin/bookdetailadmin.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { UploadcoverComponent } from './uploadcover/uploadcover.component';
import { UploadtrailerComponent } from './uploadtrailer/uploadtrailer.component';
import { SearchadminComponent } from './searchadmin/searchadmin.component';
import { TrailerlistbookComponent } from './trailerlistbook/trailerlistbook.component';
import { FilelistComponent } from './filelist/filelist.component';
import { ReadbookComponent } from './readbook/readbook.component';
import { ChapterlistComponent } from './chapterlist/chapterlist.component';
import { TopbooksComponent } from './topbooks/topbooks.component';
import { CreatedaccountsComponent } from './createdaccounts/createdaccounts.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { MyFavouritesComponent } from './my-favourites/my-favourites.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewslistComponent } from './reviewslist/reviewslist.component';


const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, //// ↓ páginas normales
  { path: 'home', component: HomeComponent},
  { path: 'terms', component: TermsComponent},
  { path: 'help', component: HelpComponent},
  { path: 'contactus', component: ContactusComponent},
  { path: 'news', component: NewsComponent},
  { path: 'recommended', component: RecommendedComponent},
  { path: 'test', component: TESTComponent},

  { path: 'profiles4', component: Profiles4Component}, ///// ↓ funciones de user ↓
  { path: 'profiles2', component: Profiles2Component},
  { path: 'account', component:AccountComponent},
  { path: 'search', component:SearchComponent},
  { path: 'changepassword', component:ChangepasswordComponent},
  { path: 'changesubscription',component:ChangesubscriptionComponent},
  { path: 'myreviews', component:MyreviewsComponent},
  { path: 'accountdetails', component:AccountdetailsComponent},
  { path: 'bookdetail', component:BookdetailComponent},
  { path: 'readinghistory', component:ReadinghistoryComponent},
  { path: 'readbook', component:ReadbookComponent},
  { path: 'chapterlist', component:ChapterlistComponent},
  { path: 'reviews',component:ReviewsComponent},
  { path: 'addreview', component:AddReviewComponent},


  { path: 'adminpanel', component:AdminPanelComponent}, ///////// ↓ funciones de admin ↓

  { path: 'searchadmin', component:SearchadminComponent},

  { path: 'booklist', component:BooklistComponent},
  { path: 'bookcreate', component:BookcreateComponent},
  { path: 'bookmodify', component:BookmodifyComponent},
  { path: 'bookdelete', component:BookdeleteComponent},
  { path: 'bookdetailadmin', component:BookdetailadminComponent},

  { path: 'topbooks', component:TopbooksComponent},
  { path: 'createdaccounts', component:CreatedaccountsComponent},

  { path: 'fileupload', component:FileuploadComponent},
  { path: 'filelist', component:FilelistComponent},
  { path: 'uploadfile', component:UploadfileComponent},
  { path: 'uploadcover', component:UploadcoverComponent},
  { path: 'uploadtrailer', component:UploadtrailerComponent},

  { path: 'reviewslist', component:ReviewslistComponent},

  { path: 'favourites', component:MyFavouritesComponent},

  { path: 'newslist', component:NewslistComponent},
  { path: 'newsmodify', component:NewsmodifyComponent},
  { path: 'newscreate', component:NewscreateComponent},
  { path: 'newsdelete', component:NewsdeleteComponent},
  { path: 'newdetail', component:NewdetailComponent},

  { path: 'trailerlist', component:TrailerlistComponent},
  { path: 'trailerlistbook', component:TrailerlistbookComponent},
  { path: 'trailercreate', component:TrailercreateComponent},
  { path: 'trailerdetail', component:TrailerdetailComponent},

  { path: 'genrecreate', component:GenrecreateComponent},
  { path: 'genredelete', component:GenredeleteComponent},

  { path: 'authorcreate', component:AuthorcreateComponent},
  { path: 'authordelete', component:AuthordeleteComponent},

  { path: 'publishercreate', component:PublishercreateComponent},
  { path: 'publisherdelete', component:PublisherdeleteComponent}, //////////

  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
