import { CreditCardI } from './user';
import { ProfilesI } from './account';
import { AccountI } from './account';

export interface JwtResponseI {
    "dataUser":{
      account: string,
      name: string,
      email: string,
      accessToken: string,
      expiresIn:string,
}
}

export interface JwtResponseLoginI{
    access_token: string,
    user_id: string,
    name: string,
    email: string,
    account: AccountI
}



