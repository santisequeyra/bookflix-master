import { genreI } from './genre';
import { authorI } from './author';
import { publisherI } from './publisher'
import { trailerI } from './trailer';
import { reviewI } from './review';


export interface bookCreateI{
  title:string,
  isbn:string,
  publisher:string,
  genre:string,
  author:string,
  reviews:[String],
  file:[string],
  complete:boolean
  release:string,
  cover:string,
  date:Date

}

export interface favouriteI{
  user_id:string,
  profile_id:string,
}

export interface getFavouriteI{
  user_id:string;
}



export interface modifyComplete{
  complete:boolean;
}

export interface topBookI{
  trailers:[string],
  file:[string],
  cover:string,
  timesread:number,
  _id:string,
  title:string,
  isbn:string,
  publisher:string,
  genre:string,
  author:string,
}
export interface bookI {
  reviews:reviewI,
  file:[fileI],
  concealment:string,
  cover:string,
  trailers:[trailerI],
  _id: string ,
  timesread:number,
  title:string ,
  isbn:string,
  publisher:{
    books:[String],
    _id:String,
    name:String,
  },
  genre:{
    books:[String],
    _id:String,
    name:String,
  }
  author:{
    books:[String],
    _id:String,
    name:String,
  }
  complete:boolean,
  date: Date,
 }

 export interface fileI {
  concealment:Date;
  _id:string,
  fileId:string,
  release:Date,
  book:string,
  chapternumber:number,
}

 export interface bookModifyI{
   title:String,
   genre:String,
   isbn:String,
   publisher:string,
   author:String,
   complete:boolean
 }


 export interface bookAllI{
   trailers:[String],
   file:[String],
   concealment:String,
   cover:String,
   _id:String,
   reviews:String,
   title:String,
   isbn:String,
   publisher:String,
   genre:String,
   author:string,
   complete:boolean,
   date:Date,
 }
