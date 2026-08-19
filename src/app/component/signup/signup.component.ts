import {Component, inject, OnInit} from '@angular/core';
import {SignupService} from '../../service/signup.service';
import {User} from '../../model/user.model';
import {tap} from 'rxjs';

@Component({
  imports: [],
  selector: 'app-signup.component',
  styleUrl: './signup.component.css',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  userDTO: User | undefined;
  signupService = inject(SignupService);

    ngOnInit(): void {

      this.signupService.signup().pipe(tap(
        (response: User) => {
          console.log("signupService pipe tap " + JSON.stringify(response));
        }
      ))
      .subscribe({
        next: (response: User) => {
          console.log("signupService subscribe " + JSON.stringify(response));
        },
        error: (error: Error) => {
          console.log("signupService subscribe error " + JSON.stringify(error));
        },
        complete: () => {
          console.log("signupService subscribe complete ");
        }
      });
    }
}
