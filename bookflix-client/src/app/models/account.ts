import { CreditCardI } from './user';
import { bookI } from './book';
import { reviewI } from './review';

export interface AccountI {
  plan: string,
  profiles: [ProfilesI],
  credit_card:CreditCardI ,
}

export interface ProfilesI {
  reviews:[reviewI],
  readings:[ReadBookI],
  _id:string,
  name:string,

}
export interface ReadBookI{
  current_page:number,
  book:bookReadingsI,
}

export interface bookReadingsI{
  trailers:[string],
  file:[string],
  concealment:string,
  cover:string,
  _id: string ,
  reviews:[string],
  title:string,
  isbn:string,
  publisher:string,
  genre:string,
  author:string,
  complete:boolean,
  date: Date,
}
export interface ReadingBookI {
  user_id:String,
  book_id:String,
  profile_id:String,
  current_page:Number,

}

export interface changePlanI {
  user_id:string,
  plan:string,
}

export interface profileDeleteI{
  user_id:string,
  profile_id:string,
}

export interface profileCreateI{
  user_id:string,
  profile:string,
}
