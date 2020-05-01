import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Data, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {User} from '../model/user.model';
import {BehaviorSubject} from 'rxjs';

export interface AuthResp {
  id: number;
  userName: string;
  email: string;
  role: string;
  token: string;
  pic: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.APIPrefix;
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(credential: {username: string, email: string, password: string}) {
    return this.http.post(this.apiUrl + 'create/account', {
      userName: credential.username,
      password: credential.password,
      email: credential.email
    });
  }

  login(credential: {username: string, password: string}) {
    return this.http.post<AuthResp>(this.apiUrl + 'authenticate', {
      userName: credential.username,
      password: credential.password
    }).pipe(tap(value => {
      this.authHandler(value);
    }));
  }

  private authHandler(crd: AuthResp) {
    const expiresIn = jwt_decode(crd.token).exp;
    console.log(expiresIn);
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(crd.id, crd.userName, crd.pic, crd.email, crd.role, crd.token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  autoLogout(exp: number) {
    // this.tokenExpirationTimer = setTimeout(() => {
    //   this.logout();
    // }, exp);
  }

  logout() {
    this.http.delete(this.apiUrl + 'user/logout').pipe(tap(_ => {
      this.user.next(null);
      this.router.navigate(['/login']);
      localStorage.removeItem('userData');
      if (this.tokenExpirationTimer) {
        clearTimeout(this.tokenExpirationTimer);
      }
      this.tokenExpirationTimer = null;
    })).subscribe();

  }

  autoLogin() {
    const userData: {
      id: number,
      userName: string,
      pic: string,
      email: string,
      role: string,
      _token: string,
      _tokenExpirationDate: Date
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.id,
      userData.userName,
      userData.pic,
      userData.email,
      userData.role,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.router.navigate(['/main']);
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

}
