import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class RequestTimestampInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const startTime = (new Date()).getTime();

        return next.handle(req).pipe(
            tap(_ => { console.log('RequestTimestampInterceptor'); }),
            map(event => {
                if (event instanceof HttpResponse) {
                    const endTime = (new Date()).getTime();

                    event = event.clone({ headers: event.headers.set('endTime', endTime.toString()) });
                    event = event.clone({ headers: event.headers.set('startTime', startTime.toString()) });
                    const diff = endTime - startTime;
                    console.log(event.url + ' succeeded in ' + diff + ' milliseconds');
                }
                return event;
            }),
            tap(event => { },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        const endTime = (new Date()).getTime();
                        const diff = endTime - startTime;
                        console.log(error.url + ' failed in ' + diff + ' milliseconds');
                    }
                }
            )
        );
    }
}
