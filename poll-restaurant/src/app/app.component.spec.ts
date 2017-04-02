import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, EventEmitter } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginService } from "app/login/service/login.service";
import { ConfigService } from "app/configuracao/service/config.service";
import { PollService } from "app/poll/service/poll.service";

describe('AppComponent', function () {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let componentPollService: PollService; // the actually injected service
  let pollService: PollService; // the TestBed injected service
  let componentLoginService: LoginService; // the actually injected service
  let loginService: LoginService; // the TestBed injected service

  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  let loginServiceStub: {
    errorEmitter: EventEmitter<Response>;
  };

  let pollServiceStub: {
    errorEmitter: EventEmitter<Response>;
  };

  beforeEach(async(() => {

    loginServiceStub = {
      errorEmitter: new EventEmitter<Response>()
    };
    pollServiceStub = {
      errorEmitter: new EventEmitter<Response>()
    };

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
          RouterTestingModule.withRoutes(
            [{path: '', component: AppComponent}])
      ],
      providers: [  
        {provide: LoginService, useValue: loginServiceStub },
        {provide: PollService, useValue: pollServiceStub }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;

    // LoginService actually injected into the component
    loginService = fixture.debugElement.injector.get(LoginService);
    componentLoginService = loginService;
    // LoginService from the root injector
    loginService = TestBed.get(LoginService);

    // PollService actually injected into the component
    pollService = fixture.debugElement.injector.get(PollService);
    componentPollService = pollService;
    // PollService from the root injector
    pollService = TestBed.get(PollService);
  }));

  it('Should have component', () => expect(comp).toBeDefined());

  it('Should have Poll Restaurant', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Poll Restaurant');
  });

  it('Should Emitt Message', () => {
    fixture.componentInstance.setError("Test Message");
    
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test Message');
  });  
});