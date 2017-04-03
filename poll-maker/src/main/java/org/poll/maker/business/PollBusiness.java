package org.poll.maker.business;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

import org.poll.maker.exception.PollException;
import org.poll.maker.model.Poll;
import org.poll.maker.model.PollMail;
import org.poll.maker.model.PollOption;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class PollBusiness {

	private static final Logger LOG = LoggerFactory.getLogger(PollBusiness.class);
	@Autowired
	private JavaMailSender javaMailSender;

	@Autowired
	private CopyOnWriteArrayList<Poll> polls;

	public List<Poll> getPolls() {
		return polls;
	}

	public void setPolls(CopyOnWriteArrayList<Poll> polls) {
		this.polls = polls;
	}

	public List<Poll> getMailPolls(String mail) throws PollException {

		List<Poll> result = polls.stream()
				.filter(thePoll -> thePoll.getMailPermissions().contains(new PollMail().setMail(mail)))
				.collect(Collectors.toList());

		if (result.size() < 1) {
			throw new PollException("No polls found for this mail [" + mail + "].");
		}

		return result;
	}

	public Poll vote(String pollId, String choiceId, String voteMail) throws PollException {

		List<Poll> pollList = polls.stream()
				.filter(thePoll -> thePoll.getId().equals(pollId)
						&& thePoll.getMailPermissions().contains(new PollMail().setMail(voteMail)))
				.collect(Collectors.toList());

		if (pollList.size() < 1) {
			throw new PollException(
					"The poll with this id [" + pollId + "] and mail [" + voteMail + "] was not found.");
		}

		if (pollList.size() > 1) {
			throw new PollException("This is an error ! We found more than one poll with this id  [" + pollId
					+ "]. Please send for us this id - helenoa@gmail.com.");
		}

		Poll toReturn = pollList.get(0);

		List<PollOption> choicesList = toReturn.getOptions().stream()
				.filter(theChoice -> theChoice.getMailVote().contains(new PollMail().setMail(voteMail)))
				.collect(Collectors.toList());

		if (choicesList.size() > 0) {
			throw new PollException("You already voted in this poll !");
		}

		choicesList = toReturn.getOptions().stream().filter(theChoice -> theChoice.getId().equals(choiceId))
				.collect(Collectors.toList());

		if (choicesList.size() < 1) {
			throw new PollException(
					"The poll option with this id [" + choiceId + "] in the poll [" + pollId + "] was not found.");
		}

		if (choicesList.size() > 1) {
			throw new PollException("This is an error ! We found more than one option with this id  [" + choiceId
					+ "] in this poll [" + pollId + "]. Please send for us this id - helenoa@gmail.com.");
		}

		PollOption toVote = choicesList.get(0);
		toVote.getMailVote().add(new PollMail().setMail(voteMail));

		return toReturn;
	}

	@Scheduled(cron = "0 * * * * *")
	public void pollScheduledFinish() {
		LocalDateTime now = LocalDateTime.now();
		for (Poll poll : polls) {
			if (poll.getWinner() == null && (poll.getFinish().isAfter(now) || poll.getFinish().isEqual(now))) {
				finishPoll(poll, now);
			}
			if (poll.getDepends() != null && poll.getDepends().getWinner() != null) {
				definePastWinner(poll.getDepends().getWinner(), poll);
			}
		}
	}

	private void definePastWinner(PollOption pastWinner, Poll poll) {
		PollOption newPastWinner = poll.getOptions().stream()
				.filter(pollOption -> pastWinner.getId().equals(pollOption.getId())).findAny().orElse(null);

		notifyInvalidate(newPastWinner.getMailVote(), pastWinner, poll);
		newPastWinner.setMailVote(new ArrayList<PollMail>());
		newPastWinner.setWinnerDate(pastWinner.getWinnerDate());
	}

	private void notifyInvalidate(List<PollMail> mailVote, PollOption pastWinner, Poll poll) {
		try {
			for (PollMail mail : mailVote) {
				if (mail.isConfirmed()) {
					sendMail(mail.getMail(),
							"Poll Maker: Invalidate vote for " + poll.getTitle() + " " + poll.getFinish(),
							"Your vote was invalidated in the " + poll.getTitle() + " " + poll.getFinish()
									+ "\nBud don't worry you cant vote again !");
				}
			}
		} catch (MailException e) {
			LOG.warn(
					"Error sending invalidate mail ! Verify you connection configuration.\n" + e.getLocalizedMessage());
		}
	}

	public void sendMail(String to, String subject, String body) throws MailException {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		javaMailSender.send(message);
	}

	private void finishPoll(Poll poll, LocalDateTime winnerDate) {
		final Comparator<PollOption> voteCompare = (p1, p2) -> Integer.compare(p1.getMailVote().size(),
				p2.getMailVote().size());
		PollOption winner = poll.getOptions().stream().max(voteCompare).get();
		winner.setWinnerDate(winnerDate);
		poll.setWinner(winner);
		getPolls().remove(poll);

		notifyWinner(poll, winnerDate);

	}

	private void notifyWinner(Poll poll, LocalDateTime winnerDate) {
		try {
			for (PollMail mail : poll.getMailPermissions()) {
				if (mail.isConfirmed()) {
					sendMail(mail.getMail(),
							"Poll Maker: We have a winner for " + poll.getTitle() + " " + poll.getFinish(),
							"We got a winner for the " + poll.getTitle() + " " + poll.getFinish()
									+ "\nThe oscar goes to: " + poll.getWinner().getDescription());
				}
			}
		} catch (MailException e) {
			LOG.warn("Error sending winner mail ! Verify you connection configuration.\n" + e.getLocalizedMessage());
		}
	}
}
