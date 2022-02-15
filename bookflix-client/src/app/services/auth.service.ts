import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewUserI, UserI, PasswordI, NewCreditCardI} from '../models/user';
import {JwtResponseI, JwtResponseLoginI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

// TODO: ERROR CANNOT FIND localStorage

@Injectable()


export class AuthService {
  AUTH_SERVER = 'http://localhost:3000/api/users';
  private token: string;

  constructor(private httpClient: HttpClient) {
  }

  register(user: NewUserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          // guardar token

        }
      })
    );
  }

  login(user: UserI): Observable<JwtResponseLoginI> {
    return this.httpClient.post<JwtResponseLoginI>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
      (res: JwtResponseLoginI) => {
        if (res) {
          localStorage.setItem('USER_ID', res.user_id);
          localStorage.setItem('ACCESS_TOKEN', res.access_token);
          localStorage.setItem('PLAN', res.account.plan);
        }
      })
    );
  }

  changePassword(password:PasswordI): Observable<JwtResponseI>{
    return this.httpClient.put<JwtResponseI>(`${this.AUTH_SERVER}/password`,
      password).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
        }
      })
    );
  }

  changeCreditCard(creditCard:NewCreditCardI, current_account:string): Observable<JwtResponseI>{
    return this.httpClient.put<JwtResponseI>(`${this.AUTH_SERVER}/credit-card/`,
  creditCard).pipe(tap(
  (res: JwtResponseI) => {
    if (res) {
    }
  })
);
}



  logout(): void {
    this.token = '';
    // @ts-ignore
    localStorage.removeItem('ACCESS_TOKEN');
  }


  // TODO: LIMPIAR LO QUE NO SE USA
  /*
  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }
    return this.token;
  }
*/
}
