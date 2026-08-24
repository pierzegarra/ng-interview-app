import { Routes } from '@angular/router';
import {SignupComponent} from './component/signup/signup.component';
import {LoginComponent} from './component/login/login.component';
import {HeaderComponent} from './component/header/header.component';

export const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'header',
    component:HeaderComponent
  }
];
