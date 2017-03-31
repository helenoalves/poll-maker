import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Config} from '../model/config';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ConfigService {
    constructor(private http:Http){

    }

    private _configLocation = '../../config/config.json';

    getConfig(){
        return this.http.get(this._configLocation).map(response => <Config> response.json()).catch(this.handleError);
    }

    private handleError(error : Response){
        console.error(error);
        return Observable.throw(error || 'Undefined Error on Server Access !');
    }
}