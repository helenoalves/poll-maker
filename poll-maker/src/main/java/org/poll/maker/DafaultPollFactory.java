package org.poll.maker;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.poll.maker.model.Poll;
import org.poll.maker.model.PollMail;
import org.poll.maker.model.PollOption;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DafaultPollFactory {

	@Bean
	List<Poll> loadDafaultPoll() {
		return createPolls(null);
	}

	private List<Poll> createPolls(String isoDateTimeLimit) {

		List<Poll> toReturn = new ArrayList<Poll>();
		LocalDateTime toDate = getDateLimit(isoDateTimeLimit);
		LocalDateTime startDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(12, 0));
		while (startDate.isBefore(toDate) || startDate.isEqual(toDate)) {
			startDate = createPoll(toReturn, startDate);
		}

		return toReturn;
	}

	private LocalDateTime createPoll(List<Poll> pollList, LocalDateTime startDate) {
		LocalDateTime finishDate = startDate.plusDays(1);

		Poll toAdd = new Poll().setStart(startDate).setFinish(finishDate);
		toAdd.setTitle("Seleção de Restaurante");
		toAdd.setDescription("Eleição do restaurante para almoçar");
		toAdd.setMailPermissions(getMailPermissions());
		toAdd.setOptions(getOptions());
		if (pollList.size() > 0) {
			if (toAdd.getStart().getDayOfWeek().compareTo(DayOfWeek.MONDAY) != 0)
				toAdd.setDepends(pollList.get(pollList.size() - 1));
		}

		pollList.add(toAdd);

		return finishDate;
	}

	private List<PollOption> getOptions() {
		List<PollOption> optionsList = new ArrayList<PollOption>(7);
		optionsList.add(new PollOption().setDescription("Restaurante A"));
		optionsList.add(new PollOption().setDescription("Restaurante B"));
		optionsList.add(new PollOption().setDescription("Restaurante C"));
		optionsList.add(new PollOption().setDescription("Restaurante D"));
		optionsList.add(new PollOption().setDescription("Restaurante E"));
		optionsList.add(new PollOption().setDescription("Restaurante F"));
		optionsList.add(new PollOption().setDescription("Restaurante G"));

		return optionsList;
	}

	private List<PollMail> getMailPermissions() {
		List<PollMail> mailList = new ArrayList<PollMail>();
		mailList.add(new PollMail().setMail("helenoa@gmail.com").setName("Heleno Alves").setConfirmed(true));
		mailList.add(new PollMail().setMail("filipebdh@gmail.com").setName("Heleno Alves").setConfirmed(false));
		mailList.add(new PollMail().setMail("alexiscviurb@gmail.com").setName("Heleno Alves").setConfirmed(false));
		mailList.add(new PollMail().setMail("brunooliveira1014@gmail.com").setName("Heleno Alves").setConfirmed(false));
		mailList.add(new PollMail().setMail("leonardo.alegre@gmail.com").setName("Heleno Alves").setConfirmed(false));
		mailList.add(new PollMail().setMail("catarinat@dbserver.com.br").setName("Heleno Alves").setConfirmed(false));
		mailList.add(new PollMail().setMail("ginaneves@gmail.com").setName("Heleno Alves").setConfirmed(false));

		return mailList;
	}

	private LocalDateTime getDateLimit(String isoDateTimeLimit) {
		if (isoDateTimeLimit == null) {
			LocalDateTime nowDateTime = LocalDateTime.of(LocalDate.now(), LocalTime.of(12, 0));
			return nowDateTime.withDayOfMonth(nowDateTime.getMonth().length(false));
		} else {
			return LocalDateTime.parse(isoDateTimeLimit, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
		}
	}
}
