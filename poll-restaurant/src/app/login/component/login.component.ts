import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'login',
  templateUrl: './html/login.component.html'
})
export class LoginComponent {
  title = 'Restaurant Poll';
  mail;

  constructor(private loginService: LoginService) { }

  login() {
    this.loginService.doLogin(this.mail);
  }
}