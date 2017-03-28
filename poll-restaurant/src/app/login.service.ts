import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Poll } from './poll';
import { Config } from './configuracao/model/config';
import { ConfigService } from './configuracao/service/config.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
  private sysConfig: Config;
  private errorString: string;

  esconderMenuEmitter = new EventEmitter<Poll[]>();

  constructor(private _configService: ConfigService, private http: Http) { }


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
    return Observable.throw(error.json().error || 'Server Error');
  }

  fazerLogin(mail) {
    this._configService
      .getConfig()
      .subscribe(
      config => { this.sysConfig = config }
      , error => this.errorString = <any>error
      , () => this.getPolls(this.sysConfig, mail)
        .subscribe(
        polls => { this.loginPolls(polls) }
        , error => this.errorString = <any>error
        )
      );
  }

  loginPolls(polls: Poll[]) {
    this.esconderMenuEmitter.emit(polls);

    console.log(polls);
  }

}
