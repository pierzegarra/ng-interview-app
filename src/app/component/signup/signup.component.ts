import {Component, inject, OnInit, signal} from '@angular/core';
import {SignupService} from '../../service/signup.service';
import {User} from '../../model/user.model';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
import {form, FormField, required, submit} from '@angular/forms/signals';

@Component({
  imports: [
    FormField
  ],
  selector: 'app-signup.component',
  styleUrl: './signup.component.css',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  userDTO: User | undefined;
  signupService = inject(SignupService);
  private router = inject(Router);

  ngOnInit(): void {
    console.log("Signup Component");
    /*
    this.signupService.signup().pipe(tap(
      (response: User) => {
        console.log("signupService pipe tap " + JSON.stringify(response));
      }
    ))
    .subscribe({
      next: (response: User) => {
        console.log("signupService subscribe " + JSON.stringify(response));
        this.router.navigate(['/login']).then(r => {});
      },
      error: (error: Error) => {
        console.log("signupService subscribe error " + JSON.stringify(error));
      },
      complete: () => {
        console.log("signupService subscribe complete ");
      }
    });
    */
  }

  signupModel= signal<User>({
    id:"",
    username:"",
    fullName:"",
    email:"",
    phoneNumber:"",
    message:"",
    password:"",
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
    role:""
  });

  signupForm:any = form(this.signupModel, (schemaPath) => {
    required(schemaPath.username, {message: 'Username is required'});
    required(schemaPath.fullName, {message: 'Fullname is required'});
    required(schemaPath.email, {message: 'Email is required'});
    required(schemaPath.password, {message: 'Password is required'});
    required(schemaPath.phoneNumber, {message: 'PhoneNumber is required'});
    required(schemaPath.profileImageUrl, {message: 'ProfileImageUrl is required'});
    required(schemaPath.role, {message: 'Role is required'});
  });

  onSubmit(event: Event) {
    console.log("SignupComponent onSubmit ");
    event.preventDefault();
    submit(this.signupForm, {
      action: async () => {
        const user: User = this.signupModel();
        console.log("signup request : " + JSON.stringify(user));
        this.signupService.signup(user).pipe(tap(
          (response: User) => {
            console.log("response: ", response);
            return response
          }
        ))
          .subscribe({
            next: (response: User) => {
              console.log("response: " + response);
              if (response) {
                this.router.navigate(['/login']);
              }
            },
            error: (err: Error) => {
              console.log("error : " + Error.toString());
            },
            complete: () => {
              console.log("Complete");
            }
          });
      },
    }).then(r => {});
  }
}
