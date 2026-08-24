import {Component, inject, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NgIf} from '@angular/common';
import {LoginResponse} from './model/login.response';
import {LoginService} from './service/login.service';
import {map, tap} from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
class App implements OnInit {
  protected readonly title = signal('ng-interview-app');
  currentUser: LoginResponse | string | undefined;
  loginService: LoginService = inject(LoginService);

  ngOnInit(): void {
      this.loginService.login().pipe(tap(
        (response: LoginResponse) => {
          console.log("response: ", response);
          this.currentUser = response.user;
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
  }
}

export default App
