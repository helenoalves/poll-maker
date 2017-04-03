import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../model/poll';
import { LoginService } from "app/login/service/login.service";

@Component({
  selector: 'poll-results',
  templateUrl: './html/poll.results.component.html'
})
export class PollResultsComponent implements OnInit {
  mail;
  poll: Poll;
  subscribe: any;

  constructor(private route: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
       this.poll = JSON.parse(params['poll']);
       this.mail = params['mail']
    });
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  back(){
    this.loginService.doLogin(this.mail);
  }
}