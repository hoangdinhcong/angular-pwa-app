import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { XML2JsonInterceptor } from './response-format/xml2-json.interceptor';
import { RequestTimestampInterceptor } from './request-timestamp/request-timestamp.interceptor';
import { AjaxBusyIdentifierInterceptor } from './ajax-busy-indicator/ajax-busy-identifier.interceptor';
import { AuthInterceptor } from './auth/auth.interceptor';

export const interceptorProviders =
    [
        { provide: HTTP_INTERCEPTORS, useClass: RequestTimestampInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AjaxBusyIdentifierInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: XML2JsonInterceptor, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: ErrorNotifierService, multi: true },
        // { provide: HTTP_INTERCEPTORS, useClass: RetryInterceptorService, multi: true }
    ];
