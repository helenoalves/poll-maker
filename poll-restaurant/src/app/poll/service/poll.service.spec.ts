import { async, inject, TestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule, Http, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { Router } from "@angular/router";
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

import { PollService } from './poll.service';
import { ConfigService } from "app/configuracao/service/config.service";
import { Poll } from "app/poll/model/poll";
import { Observable } from "rxjs/Observable";
import { Config } from "app/configuracao/model/config";

////////  Tests  /////////////
describe('Http-PollService (mockBackend)', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule,
                RouterTestingModule
            ],
            providers: [
                PollService,
                ConfigService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    it('Can instantiate service when inject service',
        inject([PollService], (service: PollService) => {
            expect(service instanceof PollService).toBe(true);
        }));



    it('Can instantiate service with "new"', inject([ConfigService, Http, Router], (configService: ConfigService, http: Http, router: Router) => {
        expect(http).not.toBeNull('http should be provided');
        let service = new PollService(configService, http, router);
        expect(service instanceof PollService).toBe(true, 'new service should be ok');
    }));


    it('Can provide the mockBackend as XHRBackend',
        inject([XHRBackend], (backend: MockBackend) => {
            expect(backend).not.toBeNull('backend should be provided');
        }));

    describe('when votePoll', () => {
        let backend: MockBackend;
        let service: PollService;
        let fakePoll: Poll;
        let responseFull: Response;
        let responseEmpty: Response;
        let spy: jasmine.Spy;

        beforeEach(inject([ConfigService, Http, Router, XHRBackend], (configService: ConfigService, http: Http, router: Router, be: MockBackend) => {
            backend = be;
            service = new PollService(configService, http, router);
            fakePoll = new Poll('1', 'Poll Test 1', '', undefined, undefined, undefined);

            let optionsFull = new ResponseOptions({ status: 200, body: { data: fakePoll } });
            responseFull = new Response(optionsFull);

            let optionsEmpty = new ResponseOptions({ status: 200, body: { data: [] } });
            responseEmpty = new Response(optionsEmpty);
        }));

        it('should have expected fake vote (then)', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(responseFull));

            service.votePoll('helenoa@gmail.com', 1, 1).toPromise()
                .then(polls => {
                    expect(polls.title).toBe(fakePoll.title,
                        'should have same poll title');
                });
        })));
    });
});