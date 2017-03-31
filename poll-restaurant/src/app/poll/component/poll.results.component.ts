import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../service/poll.service';
import { Poll } from '../model/poll';

@Component({
  selector: 'poll-results',
  templateUrl: './html/poll.results.component.html'
})
export class PollResultsComponent implements OnInit {
  mail;
  poll: Poll;
  subscribe: any;

  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
       this.poll = JSON.parse(params['poll']);
       this.mail = params['mail']
    });
  }

  ngOnDestroy(){
    this.subscribe.unsubscribe();
  }

  vote(choiceId) {
    this.pollService.vote(this.mail, this.poll.id, choiceId);
  }  
}