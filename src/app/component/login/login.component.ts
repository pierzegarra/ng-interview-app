import {Component, inject, signal} from '@angular/core';
import {LocalStorageService} from '../../service/local.storage.service';
import {LoginService} from '../../service/login.service';
import {UserService} from '../../service/user.service';
import {LoginResponse} from '../../model/login.response';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {form, FormField, required, submit} from '@angular/forms/signals';
import {LoginRequest} from '../../model/login.request';
import {tap} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FormField
  ],
  selector: 'app-login.component',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  private fb: FormBuilder | undefined;
  localStorageService:LocalStorageService = inject(LocalStorageService);
  loginService:LoginService = inject(LoginService);
  userService:UserService = inject(UserService);
  private router = inject(Router);
  currentUser: string | undefined;

  loginModel= signal<LoginRequest>({
    username: "",
    password: ""
  })
  /*
  ngOnInit() {
    this.loginForm = this.fb?.group({
      username: [''],
      password: ['']
    });
    console.log("loginForm : " + this.loginForm);
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
  */

  loginForm:any = form(this.loginModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.password, {message: 'Password is required'});
  });

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.loginForm, {
      action: async () => {
        const loginRequest: LoginRequest = this.loginModel();
        console.log("loginRequest : " + loginRequest);
        this.loginService.login(loginRequest).pipe(tap(
          (response: LoginResponse) => {
            console.log("response: ", response);
            this.currentUser = response.user?.username.toString();
            return response.user
          }
        ))
          .subscribe({
            next: (response: LoginResponse) => {
              console.log("response: " + response);
              this.getLocalStorage(response);
              if (response.token) {
                this.router.navigate(['/user']);
              }
            },
            error: (err: Error) => {
              console.log("error : " + JSON.parse(Error.toString()));
            },
            complete: () => {
              console.log("Complete");
            }
          });

      },
    }).then(r => {});
  }

  getLocalStorage(response: LoginResponse){
    this.localStorageService.setItem("currentUser", !!response.user?.username)
    this.localStorageService.setItem("token", response.token);
    this.localStorageService.setItem("refreshToken", response.refreshToken);
    this.localStorageService.setItem("user", response.user);
    this.localStorageService.setItem("expiresIn", response.expiresIn);
  }
}
