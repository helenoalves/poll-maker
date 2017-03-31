package org.poll.maker.model;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class Poll {

	private String title;
	private String description;
	private LocalDateTime start;
	private LocalDateTime finish;
	private Poll depends;
	private List<PollOption> options = new ArrayList<PollOption>();
	private PollOption winner;
	private List<PollMail> mailPermissions = new ArrayList<PollMail>();

	public String getTitle() {
		return title;
	}

	public Poll setTitle(String title) {
		this.title = title;
		return this;
	}

	public String getDescription() {
		return description;
	}

	public Poll setDescription(String description) {
		this.description = description;
		return this;
	}

	public LocalDateTime getStart() {
		return start;
	}

	public Poll setStart(LocalDateTime start) {
		this.start = start;
		return this;
	}

	public LocalDateTime getFinish() {
		return finish;
	}

	public Poll setFinish(LocalDateTime finish) {
		this.finish = finish;
		return this;
	}

	public Poll getDepends() {
		return depends;
	}

	public Poll setDepends(Poll depends) {
		this.depends = depends;
		return this;
	}

	public List<PollOption> getOptions() {
		return options;
	}

	public Poll setOptions(List<PollOption> options) {
		this.options = options;
		return this;
	}

	public PollOption getWinner() {
		return winner;
	}

	public Poll setWinner(PollOption winner) {
		this.winner = winner;
		return this;
	}

	public List<PollMail> getMailPermissions() {
		return mailPermissions;
	}

	public Poll setMailPermissions(List<PollMail> mailPermissions) {
		this.mailPermissions = mailPermissions;
		return this;
	}

	public String getId() {
		return getFinish().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) + getTitle().hashCode();
	}
}
