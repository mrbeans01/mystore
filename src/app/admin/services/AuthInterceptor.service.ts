import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest , HttpResponse , HttpErrorResponse} from '@angular/common/http';
import { AuthenticationService } from './Authentication.service';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private auth: AuthenticationService ,private  router : Router) {
    this.router = router;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    const authHeader = this.auth.token;
    // Clone the request to add the new header.
    const authReq = req.clone({headers: req.headers.set('x-access-token', authHeader)});
    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).do(event => {}, err => {
      if (err instanceof HttpErrorResponse && err.status == 401) {
        // handle 401 errors
        this.router.navigate(['/login']);
        return err;
      }
    });
  }

};

