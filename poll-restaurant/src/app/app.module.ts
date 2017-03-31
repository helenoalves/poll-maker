import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/component/login.component';
import { PollComponent } from './poll/component/poll.component';
import { AppRoutingModule } from './app.routing.module';
import { LoginService } from './login/service/login.service';
import { ConfigService } from './configuracao/service/config.service';
import { AuthGuard } from './guards/auth.guard';
import { PollService } from "app/poll/service/poll.service";
import { PollDetailsComponent } from "app/poll/component/poll.details.component";
import { PollResultsComponent } from "app/poll/component/poll.results.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PollComponent,
    PollDetailsComponent,
    PollResultsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MaterializeModule,
    AppRoutingModule
  ],
  providers: [
    ConfigService,
    PollService,
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
