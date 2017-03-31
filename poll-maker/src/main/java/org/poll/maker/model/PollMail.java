package org.poll.maker.model;

public class PollMail {

	private String name;
	private String mail;
	private Boolean confirmed;

	public String getName() {
		return name;
	}

	public PollMail setName(String name) {
		this.name = name;
		return this;
	}

	public String getMail() {
		return mail;
	}

	public PollMail setMail(String mail) {
		this.mail = mail;
		return this;
	}

	public Boolean isConfirmed() {
		return confirmed;
	}

	public PollMail setConfirmed(Boolean confirmed) {
		this.confirmed = confirmed;
		return this;
	}

	@Override
	public boolean equals(Object obj) {
		return obj instanceof PollMail ? this.getMail().equals(((PollMail) obj).getMail()) : false;
	}

}
