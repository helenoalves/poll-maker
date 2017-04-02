/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginService } from "app/login/service/login.service";

class MockLoginService {
  mockReturn: boolean;

  public isUserAuth(): boolean {
    return this.mockReturn;
  }
}

describe('AuthGuardService', () => {
  let spy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: LoginService, useClass: MockLoginService }
      ],
      imports: [RouterTestingModule]
    });
  });

  it('Check navigation logged user',
    // inject your guard service AND Router
    async(inject([AuthGuard, LoginService, Router], (auth, loginService, router) => {

      loginService.mockReturn = true;

      expect(auth.canActivate()).toBeTruthy();
    })
    ));

  it('Check navigation back login user not logged',
    // inject your guard service AND Router
    async(inject([AuthGuard, LoginService, Router], (auth, loginService, router) => {

      loginService.mockReturn = false;

      // add a spy
      spyOn(router, 'navigate');

      expect(auth.canActivate()).toBeFalsy();
      expect(router.navigate).toHaveBeenCalled();
    })
    ));    
});