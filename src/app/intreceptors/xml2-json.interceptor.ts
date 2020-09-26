import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class XML2JsonInterceptor implements HttpInterceptor {

    constructor(private xml2jsonService: NgxXml2jsonService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({ responseType: 'text' });

        return next.handle(req).pipe(
            tap(_ => { console.log('XML2JsonInterceptor'); }),
            map(event => {
                if (event instanceof HttpResponse && event.headers.get('content-type') && event.headers.get('content-type').indexOf('application/xml') >= 0) {
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(event.body, 'text/html');
                    event = event.clone({ body: this.xml2jsonService.xmlToJson(xml) });
                }
                else if (event instanceof HttpResponse && event.headers.get('content-type') && event.headers.get('content-type').indexOf('application/json') >= 0) {
                    event = event.clone({ body: JSON.parse(event.body) });
                }

                return event;
            }));
    }
}
