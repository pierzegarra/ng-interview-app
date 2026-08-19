import {Component, inject, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {LoginService} from '../../service/login.service';
import {LoginResponse} from '../../model/login.response';
import {LocalStorageService} from '../../service/local.storage.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  localStorageService:LocalStorageService = inject(LocalStorageService);
  loginService:LoginService = inject(LoginService);
  userService:UserService = inject(UserService);
  user: User = new User();

  ngOnInit() {
    this.loginService.login().subscribe({
      next: (response: LoginResponse )=> {
        console.log("loginService : ",JSON.stringify(response));
        this.localStorageService.setItem("token", response.token);
        this.localStorageService.setItem("refreshToken", response.refreshToken);
        this.localStorageService.setItem("user", response.user);
        this.localStorageService.setItem("expiresIn", response.expiresIn);
      },
      error: (error) => {
        console.log("loginService error : ",JSON.stringify(error));
      },
      complete: () => {
        this.userService.getUserByUsername().subscribe({
          next: (user: User) => {
            this.user = user;
            console.log("user profile ",JSON.stringify(user))
          },
          error: () => {},
          complete: () => {}
        })

      }
    })


  }
}
