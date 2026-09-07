import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from '../model/login.response';
import {User} from '../model/user.model';
import {LoginRequest} from '../model/login.request';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private rootUrl: string = "http://localhost:8080/api/auth/login";

  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest) {
    return this.http.post<LoginResponse>(this.rootUrl, loginRequest);
  }
}
