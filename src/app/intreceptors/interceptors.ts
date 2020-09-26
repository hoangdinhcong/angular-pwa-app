import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { XML2JsonInterceptor } from './xml2-json.interceptor';
import { RequestTimestampInterceptor } from './request-timestamp.interceptor';

export const interceptorProviders =
    [
        { provide: HTTP_INTERCEPTORS, useClass: RequestTimestampInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: AjaxBusyIdentifierInterceptorService, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: XML2JsonInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierService, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptorService, multi: true }
    ];
