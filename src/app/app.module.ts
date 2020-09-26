import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { interceptorProviders } from './intreceptors/interceptors';
import { AjaxBusyIndicatorDirective } from './directives/ajax-busy-indicator.directive';

@NgModule({
  declarations: [
    AppComponent,
    AjaxBusyIndicatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    interceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
