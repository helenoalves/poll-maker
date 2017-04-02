import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { LoginService } from "app/login/service/login.service";
import { PollService } from "app/poll/service/poll.service";

@Component({
  selector: 'poll-restaurant',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Poll Restaurant';
  errorMessage: string;
  constructor(private loginService: LoginService, private pollService: PollService) { }

  ngOnInit() {
    this.loginService.errorEmitter.subscribe(
      error => this.setError(error.json().message)
    );
    this.pollService.errorEmitter.subscribe(
      error => this.setError(error.json().message)
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
