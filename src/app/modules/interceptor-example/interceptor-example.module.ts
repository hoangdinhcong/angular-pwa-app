import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterceptorExampleComponent } from './interceptor-example.component';
import { AjaxBusyIndicatorDirective } from './ajax-busy-indicator/ajax-busy-indicator.directive';
// import { interceptorProviders } from './interceptors';
import { InterceptorExampleRoutingModule } from './interceptor-example-routing.module.ts';


@NgModule({
  declarations: [InterceptorExampleComponent, AjaxBusyIndicatorDirective],
  imports: [
    CommonModule,
    InterceptorExampleRoutingModule
  ],
  providers: [
    // interceptorProviders
  ],
})
export class InterceptorExampleModule { }
