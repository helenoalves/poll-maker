import { Router, ActivatedRoute } from '@angular/router';
import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { ConfigService } from '../../configuracao/service/config.service';
import { Config } from '../../configuracao/model/config';
import { Poll } from '../../poll/model/poll';

@Injectable()
export class PollService {
  private sysConfig: Config;
  errorEmitter = new EventEmitter<Response>();
  private poll: Poll;

  constructor(private _configService: ConfigService, private http: Http, private router: Router) { }


  private _pollUrl = 'http://<serviceURL>:<servicePort>/vote?poll=<poll>&choice=<choice>&mail=<mail>';

  replaceConfig(sysConfig: Config, mail, pollId, choiceId) {
    this._pollUrl = this._pollUrl.replace('<serviceURL>', sysConfig.serviceURL);
    this._pollUrl = this._pollUrl.replace('<servicePort>', sysConfig.servicePort.toString());
    this._pollUrl = this._pollUrl.replace('<poll>', pollId);
    this._pollUrl = this._pollUrl.replace('<choice>', choiceId);
    this._pollUrl = this._pollUrl.replace('<mail>', mail);
  }

  votePoll(sysConfig: Config, mail, pollId, choiceId) {
    this.replaceConfig(sysConfig, mail, pollId, choiceId);
    return this.http.get(this._pollUrl).map(res => <Poll>res.json()).catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Undefined Error on Server Access !');
  }

  vote(mail, pollId, choiceId) {
    this._configService
      .getConfig()
      .subscribe(
      config => { this.sysConfig = config }
      , error => this.errorEmitter.emit(error)
      , () => this.votePoll(this.sysConfig, mail, pollId, choiceId)
        .subscribe(
        poll => { this.pollResults(poll) }
        , error => this.errorEmitter.emit(error)
        )
      );
  }

  pollResults(poll: Poll) {
    this.router.navigate(['/poll-results', { poll: JSON.stringify(poll) }]);
  }
}
