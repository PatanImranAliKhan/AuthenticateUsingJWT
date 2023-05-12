import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticateService } from './authenticate.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  token: string = this.authService.getToken() || "";

  constructor(private authService: AuthenticateService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const authReq = req.clone({
      headers: req.headers.set('x-access-token', this.token)
    });
    
    
    return next.handle(authReq);
  }
}
