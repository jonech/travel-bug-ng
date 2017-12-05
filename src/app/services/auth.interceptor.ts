import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('signin') > 0 || req.url.indexOf('signup') > 0) {
      return next.handle(req);
    }

    let auth = this.injector.get(AuthService);
    let authHeader = auth.getJWT();
    let authReq = req.clone({setHeaders: {Authorization: authHeader}});
    return next.handle(authReq);
  }
}
