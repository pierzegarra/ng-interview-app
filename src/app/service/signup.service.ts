import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Service()
export class SignupService {
  http = inject(HttpClient);

  private rootUrl: string = "http://localhost:8080/api/auth/signup";

  signup(user: User) {
    return this.http.post<User>(this.rootUrl, user);
  }
}
