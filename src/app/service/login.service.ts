import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResponse} from '../model/login.response';
import {LoginRequest} from '../model/login.request';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private rootUrl: string = "http://localhost:8080/api/auth/login";

  constructor(private http: HttpClient) {}

  login() {
    const userDTO: User = {
      username:"david",
      password:"admin",
      email:"pier.zegarra.reymundo@gmail.com"
    }

    return this.http.post<LoginResponse>(this.rootUrl, userDTO);
  }
}
