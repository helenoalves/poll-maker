import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './component/login.component';

const loginRoutes: Routes = [
    { path: '', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [
        LoginModule,
        loginRoutes
    ]
})
export class LoginModule { }