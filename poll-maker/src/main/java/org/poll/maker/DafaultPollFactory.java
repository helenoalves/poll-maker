package org.poll.maker;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.poll.maker.model.Poll;
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
		toAdd.setDescription("Eleição do restaurante para almoçar.");
		toAdd.setMailPermissions(getMailPermissions());
		toAdd.setOptions(getOptions());
		if (pollList.size() > 0) {
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

	private List<String> getMailPermissions() {
		List<String> mailList = new ArrayList<String>();
		mailList.add("helenoa@gmail.com");
		mailList.add("filipebdh@gmail.com");
		mailList.add("alexiscviurb@gmail.com");
		mailList.add("brunooliveira1014@gmail.com");
		mailList.add("leonardo.alegre@gmail.com");
		mailList.add("catarinat@dbserver.com.br");
		mailList.add("ginaneves@gmail.com");

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
