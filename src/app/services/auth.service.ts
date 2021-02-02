import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from 'rxjs';
import { retry, map } from "rxjs/operators"
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { GlobalService } from '../global.service';
import { User } from "../models/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private _globalService: GlobalService
  ) { }

  authGetToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_token');
    } else {
      return null
    }
  }

  authSetToken(token) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('user_token', token);
    }
  }

  authLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user_token');
      localStorage.removeItem('current_user');
    } else {
      return false
    }
  }

  authSetCurrentUser(data) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('current_user', JSON.stringify(data))
    } else {
      return null
    }
  }

  authGetCurrentUser() {
    if (isPlatformBrowser(this.platformId)) {
      const localItem = localStorage.getItem('current_user');
      if (localItem === null) {
        return false;
      } else {
        return JSON.parse(localItem)
      }
    } else {
      return false;
    }
  }

  authGetUsersByToken(token: string) {
    var url_token = `${this._globalService.env.API_URL}/api/users/authCurrentSession`;
    return this.http.get<any>(url_token).pipe(
      map((tokens) => {

        return tokens
      }), retry(3))
  }

  authLogin({ email, password, token }): Observable<any> {
    const url = `${this._globalService.env.API_URL}/api/users/login`;
    console.log(email, password)
    return this.http.post<User>(url, { email, password });
  }

  authRegister(email: string, password: string): Observable<User> {
    const url = `${this._globalService.env.API_URL}/api/register`;
    return this.http.post<User>(url, { email, password });
  }
}