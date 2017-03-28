package org.poll.maker.controller;

import java.util.List;

import org.poll.maker.business.PollBusiness;
import org.poll.maker.exception.PollException;
import org.poll.maker.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PollController {

	@Autowired
	private PollBusiness pollBusiness;

	@RequestMapping("/")
	public String index() {
		return "Are you trying to access poll maker ? This is not the path !";
	}

	@RequestMapping("/polls")
	public List<Poll> listPolls(@RequestParam(required = true) String mail) throws PollException {
		if (mail == null || mail.isEmpty()) {
			throw new IllegalArgumentException("The 'mail' parameter must not be null or empty");
		}

		return pollBusiness.getMailPolls(mail);
	}

	@RequestMapping("/vote")
	public Poll votePoll(@RequestParam(required = true) String poll, @RequestParam(required = true) String choice,
			@RequestParam(required = true) String mail) throws PollException {
		if (poll == null || poll.isEmpty()) {
			throw new IllegalArgumentException("The 'poll' parameter must not be null or empty");
		}

		if (mail == null || mail.isEmpty()) {
			throw new IllegalArgumentException("The 'Mail' parameter must not be null or empty");
		}

		return pollBusiness.vote(poll, choice, mail);
	}
}
