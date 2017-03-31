import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigModule } from '../configuracao/config.module';

import { PollComponent } from './component/poll.component';
import { PollOption } from './model/poll.option';
import { Poll } from './model/poll';
import { AuthGuard } from "app/guards/auth.guard";
import { CommonModule } from "@angular/common";
import { PollDetailsComponent } from "app/poll/component/poll.details.component";

const pollRoutes: Routes = [
    { path: '', component: PollComponent }

];

@NgModule({
    imports: [ 
        CommonModule,
        RouterModule.forChild(pollRoutes)
    ],
    exports: [
        PollModule,
        pollRoutes,
    ]
})
export class PollModule { }