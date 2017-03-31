package org.poll.maker.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class PollOption {
	private String description;
	private String detail;
	private List<PollMail> mailVote = new ArrayList<PollMail>();
	private LocalDateTime winnerDate;

	public String getDescription() {
		return description;
	}

	public PollOption setDescription(String description) {
		this.description = description;
		return this;
	}

	public String getDetail() {
		return detail;
	}

	public PollOption setDetail(String detail) {
		this.detail = detail;
		return this;
	}

	public List<PollMail> getMailVote() {
		return mailVote;
	}

	public PollOption setMailVote(List<PollMail> mailVote) {
		this.mailVote = mailVote;
		return this;
	}

	public LocalDateTime getWinnerDate() {
		return winnerDate;
	}

	public void setWinnerDate(LocalDateTime winnerDate) {
		this.winnerDate = winnerDate;
	}

	public String getId() {
		return Integer.toString(getDescription().hashCode());
	}

}
