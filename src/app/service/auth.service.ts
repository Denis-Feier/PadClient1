import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import {Data} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.APIPrefix;

  constructor(private http: HttpClient) {}

  signUp(credential: {username: string, email: string, password: string}) {
    return this.http.post(this.apiUrl + 'create/account', {
      userName: credential.username,
      password: credential.password,
      email: credential.email
    });
  }

  login(credential: {username: string, password: string}) {
    return this.http.post(this.apiUrl + 'authenticate', {
      userName: credential.username,
      password: credential.password
    });
  }
}
