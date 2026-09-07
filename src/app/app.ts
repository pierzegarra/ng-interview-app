import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import {LoginResponse} from './model/login.response';
import {LoginService} from './service/login.service';
import {map, tap} from 'rxjs';
import {User} from './model/user.model';
import {LoginRequest} from './model/login.request';
import {LocalStorageService} from './service/local.storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
class App {//implements OnInit {
  protected readonly title = signal('ng-interview-app');
  currentUser: boolean | null | undefined;
  loginService: LoginService = inject(LoginService);
  localStorageService : LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.currentUser = this.localStorageService.getItem("currentUser");
    /*
    const loginRequest: LoginRequest = {
      username:"david",
      password:"admin",
      email:"pier.zegarra.reymundo@gmail.com"
    }
      this.loginService.login(loginRequest).pipe(tap(
        (response: LoginResponse) => {
          console.log("response: ", response);

          return response.user
        }
      ))
      .subscribe({
        next: (response: LoginResponse) => {
          console.log("response: " + response);
        },
        error: (err: Error) => {

        },
        complete: () => {

        }
      });
     */
  }
}

export default App
