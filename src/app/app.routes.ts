import { Routes } from '@angular/router';
import {UserComponent} from './component/user/user.component';
import {SignupComponent} from './component/signup/signup.component';

export const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'login',
    component:UserComponent
  }
];
