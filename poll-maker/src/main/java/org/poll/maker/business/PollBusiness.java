package org.poll.maker.business;

import java.util.List;
import java.util.stream.Collectors;

import org.poll.maker.exception.PollException;
import org.poll.maker.model.Poll;
import org.poll.maker.model.PollOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PollBusiness {

	@Autowired
	private List<Poll> polls;

	public List<Poll> getMailPolls(String mail) throws PollException {

		List<Poll> result = polls.stream().filter(thePoll -> thePoll.getMailPermissions().contains(mail))
				.collect(Collectors.toList());

		if (result.size() < 1) {
			throw new PollException("No polls found for this mail [" + mail + "].");
		}

		return result;
	}

	public Poll vote(String pollId, String choiceId, String voteMail) throws PollException {

		List<Poll> pollList = polls.stream()
				.filter(thePoll -> thePoll.getId().equals(pollId) && thePoll.getMailPermissions().contains(voteMail))
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

		List<PollOption> choicesList = toReturn.getChoiches().stream()
				.filter(theChoice -> theChoice.getMailVote().contains(voteMail)).collect(Collectors.toList());

		if (choicesList.size() > 0) {
			throw new PollException("You already voted in this poll !");
		}

		choicesList = toReturn.getChoiches().stream().filter(theChoice -> theChoice.getId().equals(choiceId))
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
		toVote.getMailVote().add(voteMail);

		return toReturn;
	}

}
