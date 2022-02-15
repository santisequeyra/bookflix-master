export interface reviewI {
  _id:string,
  title:string,
  description:string,
  rating:number,
  book:string,
  spoiler:boolean,
  profile:string,
  date:Date,
 }

 export interface reviewCreateI {
  title:string,
  description:string,
  rating:number,
  book:string,
  profile:string,
  spoiler:boolean, //TODO checkear si implementamos spoiler.
 }


 export interface reviewDeleteI{
   review_id:string,
   book_id:string,
 }

 export interface reviewSpoilerToggleI{
   review_id:string,
   spoiler:boolean,
 }
