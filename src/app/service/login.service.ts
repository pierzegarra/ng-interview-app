import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from '../model/login.response';
import {LoginRequest} from '../model/login.request';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl: string = "http://localhost:8080/api/login";

  constructor(private http: HttpClient) {}

  login() {
    let loginRequest: LoginRequest = {
      "username": "admin",
      "password": "admin"
    }
    return this.http.post<LoginResponse>(this.baseUrl, loginRequest);
  }
}
