import { Routes } from '@angular/router';
import {SignupComponent} from './component/signup/signup.component';
import {LoginComponent} from './component/login/login.component';
import {HeaderComponent} from './component/header/header.component';
import {UserComponent} from './component/user/user.component';

export const routes: Routes = [
  {
    path:'',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'header',
    component:HeaderComponent
  },
  {
    path:'user',
    component:UserComponent
  }
];
