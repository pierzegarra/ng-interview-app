import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private http = inject(HttpClient);
  private baseUrl: string = "http://localhost:8080/api/user";

  constructor(private http: HttpClient) {}

  getUserByUsername() {
    let username = new HttpParams()
      .set('username', 'admin');
    return this.http.get<User>(this.baseUrl, {params: username});
  }
}
