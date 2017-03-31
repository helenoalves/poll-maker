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
  private sysConfig: Config;
  errorEmitter = new EventEmitter<Response>();

  private userAuth = false;
  
  constructor(private _configService: ConfigService, private http: Http, private router: Router) { }


  private _pollUrl = 'http://<serviceURL>:<servicePort>/polls?mail=<mail>';

  replaceConfig(sysConfig: Config, mail) {
    this._pollUrl = this._pollUrl.replace('<serviceURL>', sysConfig.serviceURL);
    this._pollUrl = this._pollUrl.replace('<servicePort>', sysConfig.servicePort.toString());
    this._pollUrl = this._pollUrl.replace('<mail>', mail);
  }

  getPolls(sysConfig: Config, mail) {
    this.replaceConfig(sysConfig, mail);
    return this.http.get(this._pollUrl).map(res => <Poll[]>res.json()).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Undefined Error on Server Access !');
  }

  doLogin(mail) {
    this._configService
      .getConfig()
      .subscribe(
      config => { this.sysConfig = config }
      , error => this.errorEmitter.emit(error)
      , () => this.getPolls(this.sysConfig, mail)
        .subscribe(
        polls => { this.loginPolls(polls, mail) }
        , error => this.errorEmitter.emit(error)
        )
      );
  }

  loginPolls(polls: Poll[], mail) {
    if(polls.length > 0){
      this.router.navigate(['/poll', { polls: JSON.stringify(polls), mail: mail }]);
      this.userAuth = true;
    }
  }

  isUserAuth(){
    return this.userAuth;
  }
}