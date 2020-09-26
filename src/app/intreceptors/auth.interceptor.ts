import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.isAuthenticated) {
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.auth.authToken) });
        } else {
            // TODO: login page
        }
        return next.handle(req);
    }
}
