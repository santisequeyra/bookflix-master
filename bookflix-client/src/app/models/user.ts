import { AccountI } from './account';

export interface UserI {
  user_id: number;
  name: string;
  email: string;
  account: AccountI;
  createdAt:Date;
}

export interface NewUserI {
  name: string;
  email: string;
  password: string;
  credit_card: CreditCardI;
}

export interface CreditCardI {
  number: string;
  due_date: string;
  code: string;
}

export interface NewCreditCardI {
  user_id:string;
  credit_card:{
  number: string;
  due_date: string;
  code: string;
  }
}

export interface PasswordI{
  user_id:string,
  previous_password:string,
  new_password:string,
}
