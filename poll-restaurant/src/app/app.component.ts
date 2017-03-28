import { Component } from '@angular/core';
import { LoginService } from './login.service';
import { Poll } from './poll';

@Component({
  selector: 'poll-restaurant',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant Poll';
  polls: Poll[];
  mail;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.esconderMenuEmitter.subscribe(
      polls => this.polls = polls
    );
  }

  fazerLogin() {
    this.loginService.fazerLogin(this.mail);
  }
}
