import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user.model';

@Service()
export class SignupService {
  http = inject(HttpClient);

  private rootUrl: string = "http://localhost:8080/api/auth/signup";

  signup() {
    const userDTO: User = {
      username:"david",
      fullName:"David Pier Zegarra Reymundo",
      email:"pier.zegarra.reymundo@gmail.com",
      phoneNumber:"955762325",
      message:"Welcome",
      password:"admin",
      profileImageUrl:"",
      lastLoginDate:"",
      lastLoginDateDisplay:"",
      joinDate:"",
      active:"",
      notLocked:"",
      initialDatetime:"",
      expirationDatetime:"",
      tokenExpirationTime:"",
      createAt:"",
      updateAt:"",
      role:"ROLE_SUPER_ADMIN"
    }
    return this.http.post<User>(this.rootUrl, userDTO);
  }
}
