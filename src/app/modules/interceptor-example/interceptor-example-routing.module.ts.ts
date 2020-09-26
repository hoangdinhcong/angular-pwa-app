import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterceptorExampleComponent } from './interceptor-example.component';

const routes: Routes = [
    {
        path: '',
        component: InterceptorExampleComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InterceptorExampleRoutingModule { }
