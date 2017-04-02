import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { LoginService } from './login.service';
import { ConfigService } from "app/configuracao/service/config.service";
import { Poll } from "app/poll/model/poll";
import { Observable } from "rxjs/Observable";
import { Config } from "app/configuracao/model/config";

const makePollData = () => [
  { id: '1', title: 'Poll Test 1' },
  { id: '2', title: 'Poll Test 2' },
  { id: '3', title: 'Poll Test 3' },
  { id: '4', title: 'Poll Test 4' }
] as Poll[];

////////  Tests  /////////////
describe('Http-LoginService (mockBackend)', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterTestingModule
      ],
      providers: [
        LoginService,
        ConfigService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    })
      .compileComponents();
  }));

  it('Can instantiate service when inject service',
    inject([LoginService], (service: LoginService) => {
      expect(service instanceof LoginService).toBe(true);
    }));



  it('Can instantiate service with "new"', inject([ConfigService, Http, Router], (configService: ConfigService, http: Http, router: Router) => {
    expect(http).not.toBeNull('http should be provided');
    let service = new LoginService(configService, http, router);
    expect(service instanceof LoginService).toBe(true, 'new service should be ok');
  }));


  it('Can provide the mockBackend as XHRBackend',
    inject([XHRBackend], (backend: MockBackend) => {
      expect(backend).not.toBeNull('backend should be provided');
    }));

  describe('when getPolls', () => {
    let backend: MockBackend;
    let service: LoginService;
    let fakePoll: Poll[];
    let responseFull: Response;
    let responseEmpty: Response;
    let spy: jasmine.Spy;

    beforeEach(inject([ConfigService, Http, Router, XHRBackend], (configService: ConfigService, http: Http, router: Router, be: MockBackend) => {
      backend = be;
      service = new LoginService(configService, http, router);
      fakePoll = makePollData();

      let optionsFull = new ResponseOptions({ status: 200, body: fakePoll });
      responseFull = new Response(optionsFull);

      let optionsEmpty = new ResponseOptions({ status: 200, body: [] });
      responseEmpty = new Response(optionsEmpty);      
    }));

    it('should have expected fake polls (then)', async(inject([], () => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(responseFull));

      service.getPolls('helenoa@gmail.com').toPromise()
        .then(polls => {
          expect(polls.length).toBe(fakePoll.length,
            'should have expected no. of polls');
        });
    })));

    it('should have expected navigated and auth (then)', async(inject([Router], (router) => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(responseFull));
      // add a spy
      spyOn(router, 'navigate');

      service.doLogin('helenoa@gmail.com');

      expect(service.isUserAuth()).toBeTruthy();
      expect(router.navigate).toHaveBeenCalled();
    })));

    it('should have expected not navigated and not auth (then)', async(inject([Router], (router) => {
      backend.connections.subscribe((c: MockConnection) => c.mockRespond(responseEmpty));
      
      // add a spy
      spyOn(router, 'navigate');
      
      service.doLogin('helenoa@gmail.com');

      expect(service.isUserAuth()).toBeFalsy();
      expect(router.navigate).not.toHaveBeenCalled();
    })));        
  });
});