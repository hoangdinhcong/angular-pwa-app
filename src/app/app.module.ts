import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module.ts';
import { interceptorProviders } from './modules/interceptor-example/interceptors';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
