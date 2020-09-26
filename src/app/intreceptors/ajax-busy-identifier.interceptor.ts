import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { AjaxBusyNotifierService } from '../services/ajax-busy-notifier.service';

@Injectable({
    providedIn: 'root'
})
export class AjaxBusyIdentifierInterceptor implements HttpInterceptor {

    requestCounter = 0;

    constructor(private ajaxBusyNotifierService: AjaxBusyNotifierService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.beginRequest();

        return next.handle(req).pipe(
            tap(_ => { console.log('AjaxBusyIdentifierInterceptor'); }),
            finalize(() => {
                this.endRequest();
            })
        );
    }

    private beginRequest(): void {
        this.requestCounter = Math.max(this.requestCounter, 0) + 1;

        if (this.requestCounter === 1) {
            this.ajaxBusyNotifierService.busy.next(true);
        }
    }

    private endRequest(): void {
        this.requestCounter = Math.max(this.requestCounter, 1) - 1;

        if (this.requestCounter === 0) {
            this.ajaxBusyNotifierService.busy.next(false);
        }
    }

}
