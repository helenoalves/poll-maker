import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ConfigService } from '../../configuracao/service/config.service';
import { Config } from '../../configuracao/model/config';
import { Poll } from '../../poll/model/poll';

@Injectable()
export class LoginService {
  errorEmitter = new EventEmitter<string>();
  private userAuth = false;

  constructor(private configService: ConfigService, private http: Http, private router: Router) {
    configService.getConfig().subscribe(config => this.replaceConfig(config));
  }


  private _pollUrl = 'http://<serviceURL>:<servicePort>/polls?mail=<mail>';

  replaceConfig(sysConfig: Config) {
    this._pollUrl = this._pollUrl.replace('<serviceURL>', sysConfig.serviceURL);
    this._pollUrl = this._pollUrl.replace('<servicePort>', sysConfig.servicePort.toString());
  }

  replaceParameters(mail): string {
    return this._pollUrl.replace('<mail>', mail);
  }


  getPolls(mail): Observable<Poll[]> {
    return this.http.get(this.replaceParameters(mail))
      .map(this.extractData)
      //.do(data => console.log(data))
      .catch(error => this.handleError(error.json().message));
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return <Poll[]>res.json() || [];
  }

  private handleError(error: string) {
    console.error(error);
    this.errorEmitter.emit(error);
    return Observable.throw(error || 'Undefined Error on Server Access !');
  }

  doLogin(mail) {
    this.getPolls(mail)
      .subscribe(
      polls => { this.loginPolls(polls, mail) }
      , error => this.handleError(error)
      );
  }

  loginPolls(polls: Poll[], mail) {
    if (polls.length > 0) {
      this.userAuth = true;
      this.router.navigate(['/poll', { polls: JSON.stringify(polls), mail: mail }], { skipLocationChange: true });
    } else {
      this.userAuth = false;
    }
  }

  isUserAuth(): boolean {
    return this.userAuth;
  }
}