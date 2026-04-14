import { inject, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  //private http = inject(HttpClient);
  private baseUrl: string = "http://localhost:8080/api/user?username=admin";

  constructor(private http: HttpClient) {}

  getUserByUsername(user: User | undefined) {
    return this.http.get<User[]>(this.baseUrl);
  }
}
