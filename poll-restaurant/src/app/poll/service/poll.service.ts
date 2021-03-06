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
  errorEmitter = new EventEmitter<string>();
  private poll: Poll;

  constructor(private configService: ConfigService, private http: Http, private router: Router) {
    configService.getConfig().subscribe(config => this.replaceConfig(config));
  }


  private _pollUrl = 'http://<serviceURL>:<servicePort>/vote?poll=<poll>&choice=<choice>&mail=<mail>';

  replaceConfig(sysConfig: Config) {
    this._pollUrl = this._pollUrl.replace('<serviceURL>', sysConfig.serviceURL);
    this._pollUrl = this._pollUrl.replace('<servicePort>', sysConfig.servicePort.toString());
  }

  replaceParameters(mail, pollId, choiceId): string {
    return this._pollUrl.replace('<poll>', pollId)
      .replace('<choice>', choiceId)
      .replace('<mail>', mail);
  }

  votePoll(mail, pollId, choiceId): Observable<Poll> {

    return this.http.get(this.replaceParameters(mail, pollId, choiceId))
      .map(this.extractData)
      //.do(data => console.log(data))
      .catch(error => this.handleError(error.json().message));
  }

  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return <Poll>res.json() || [];
  }

  private handleError(error: string) {
    console.error(error);
    this.errorEmitter.emit(error);
    return Observable.throw(error || 'Undefined Error on Server Access !');
  }

  vote(mail, pollId, choiceId) {
    this.votePoll(mail, pollId, choiceId)
      .subscribe(
      poll => { this.pollResults(poll, mail) }
      , error => this.handleError(error)
      );
  }

  pollResults(poll: Poll, mail) {
    this.router.navigate(['/poll-results', { poll: JSON.stringify(poll), mail: mail }], { skipLocationChange: true });
  }
}
