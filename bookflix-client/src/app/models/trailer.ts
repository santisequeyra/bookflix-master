export interface trailerI {
  _id:string,
  title:String,
  description:string,
  book:string,
  date:Date,
 }

 export interface trailerCreateI {
  title:String,
  description:String,
  book:String,

}

 export interface trailerDeleteI {
   trailer_id:string,
   book_id:string,
 }
