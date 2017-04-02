import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Config } from '../model/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ConfigService {

    configLocation = '../../config/config.json';
    sysConfig: Observable<Config>;

    constructor(private http: Http) {
        this.sysConfig = this.http.get(this.configLocation).distinctUntilChanged().map(response => <Config>response.json()).catch(this.handleError);
    }

    getConfig(): Observable<Config> {
        return this.sysConfig;
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Undefined Error on Server Access !');
    }
}