import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollService } from '../service/poll.service';
import { Poll } from '../model/poll';
import { PollOption } from "app/poll/model/poll.option";

@Component({
  selector: 'poll-details',
  templateUrl: './html/poll.details.component.html'
})
export class PollDetailsComponent implements OnInit {
  mail;
  poll: Poll;
  theSelection: PollOption;
  subscribe: any;

  constructor(private route: ActivatedRoute, private pollService: PollService) { }

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
      this.poll = JSON.parse(params['poll']);
      this.mail = params['mail']
    });
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  onSelectionChange(templateSelection) {
    this.theSelection = Object.assign({}, this.theSelection, templateSelection);
  }

  vote() {
    this.pollService.vote(this.mail, this.poll.id, this.theSelection.id);
  }
}