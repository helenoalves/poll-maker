import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Poll } from '../model/poll';

@Component({
  selector: 'polls',
  templateUrl: './html/poll.component.html'
})
export class PollComponent implements OnInit {
  mail;
  polls: Poll[];
  subscribe: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
       this.polls = JSON.parse(params['polls']);
       this.mail = params['mail']
    });
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }
}