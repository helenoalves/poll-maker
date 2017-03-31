import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/component/login.component';
import { PollComponent } from './poll/component/poll.component';
import { AuthGuard } from './guards/auth.guard';
import { PollDetailsComponent } from "app/poll/component/poll.details.component";
import { PollResultsComponent } from "app/poll/component/poll.results.component";

const appRoutes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'poll', component: PollComponent, canActivate: [AuthGuard] },
    { path: 'poll-details', component: PollDetailsComponent, canActivate: [AuthGuard] },
    { path: 'poll-results', component: PollResultsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }