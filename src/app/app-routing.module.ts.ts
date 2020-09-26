import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: 'interceptor-example',
        loadChildren: () => import('./modules/interceptor-example/interceptor-example.module').then(m => m.InterceptorExampleModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
