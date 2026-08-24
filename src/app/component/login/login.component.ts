import {Component, inject, OnInit} from '@angular/core';
import {LocalStorageService} from '../../service/local.storage.service';
import {LoginService} from '../../service/login.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user.model';
import {LoginResponse} from '../../model/login.response';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  selector: 'app-login.component',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;
  private fb: FormBuilder | undefined;
  localStorageService:LocalStorageService = inject(LocalStorageService);
  loginService:LoginService = inject(LoginService);
  userService:UserService = inject(UserService);
  user: User = new User();

  ngOnInit() {
    this.loginForm = this.fb?.group({
      username: [''],
      password: ['']
    });
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

  protected onSubmit() {
    console.log(this.loginForm?.value);
  }
}
