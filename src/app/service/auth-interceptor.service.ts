import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams, HttpHeaders
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: req.headers
            .append('Authorization', user.token)
            // // .append('Sec-Fetch-Mode', 'cors')
            //  .append('Content-Type', 'application/json')
        });
        return next.handle(modifiedReq);
      })
    );
  }

}

// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US,en;q=0.9
// Cache-Control: no-cache
// Connection: keep-alive
// Content-Length: 40
// Pragma: no-cache
// Sec-Fetch-Dest: empty
// Sec-Fetch-Site: same-site
