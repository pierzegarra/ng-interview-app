import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {LocalStorageService} from '../service/local.storage.service';

export const authInterceptor: HttpInterceptorFn
  = (req, next) =>  {
  let localStorageService = inject(LocalStorageService);
  let token:string | null = localStorageService.getItem("token");
  console.log("authInterceptor token : ", token);
  if (token && typeof token === 'string') {
    //let decodedAuth = atob(token);
    req = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  return next(req);
}
