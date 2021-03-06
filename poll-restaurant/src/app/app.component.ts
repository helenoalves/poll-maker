import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { LoginService } from "app/login/service/login.service";
import { PollService } from "app/poll/service/poll.service";

@Component({
  selector: 'poll-restaurant',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Poll Restaurants';
  errorMessage: string;
  constructor(private loginService: LoginService, private pollService: PollService) { }

  ngOnInit() {
    this.loginService.errorEmitter.subscribe(
      error => this.setError(error)
    );
    this.pollService.errorEmitter.subscribe(
      error => this.setError(error)
    );
  }

  ngOnDestroy() {
    this.loginService.errorEmitter.unsubscribe();
    this.pollService.errorEmitter.unsubscribe();
  }

  setError(error: string){
    this.errorMessage = error;
  }

  hasError() {
    return this.errorMessage === null || this.errorMessage === undefined ? false : true;
  }
}
