package org.poll.maker.model;

import java.util.ArrayList;
import java.util.List;

public class PollOption {
	private String description;
	private String detail;
	private List<String> mailVote = new ArrayList<String>();

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

	public List<String> getMailVote() {
		return mailVote;
	}

	public PollOption setMailVote(List<String> mailVote) {
		this.mailVote = mailVote;
		return this;
	}

	public String getId() {
		return Integer.toString(getDescription().hashCode());
	}

}
