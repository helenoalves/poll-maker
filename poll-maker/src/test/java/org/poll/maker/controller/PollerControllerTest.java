package org.poll.maker.controller;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.net.URI;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.poll.maker.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.embedded.LocalServerPort;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.util.UriComponentsBuilder;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PollerControllerTest {

	@LocalServerPort
	private int port;

	private URL base;

	@Autowired
	private TestRestTemplate template;

	@Before
	public void setUp() throws Exception {
		this.base = new URL("http://localhost:" + port + "/");
	}

	@Test
	public void testIndex() {
		ResponseEntity<String> response = template.getForEntity(base.toString(), String.class);
		assertThat(response.getBody(), equalTo("Are you trying to access poll maker ? This is not the path !"));
	}

	@Test
	public void testPolls() {
		LocalDateTime nowDateTime = LocalDateTime.now();
		Long pollDays = nowDateTime.until(nowDateTime.withDayOfMonth(nowDateTime.getMonth().length(false)),
				ChronoUnit.DAYS);
		pollDays++;// É exclusivo

		LocalDateTime startDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(11, 0));
		if (nowDateTime.isBefore(startDate)) {
			pollDays++;
		}
		
		URI targetUrl = UriComponentsBuilder.fromUriString(base.toString()).path("/polls")
				.queryParam("mail", "helenoa@gmail.com").build().toUri();

		ResponseEntity<List> response = template.getForEntity(targetUrl, List.class);
		assertThat(Long.valueOf(response.getBody().size()), equalTo(pollDays));

	}

	@Test
	public void testVote() {
		LocalDateTime startDate = LocalDateTime.of(LocalDate.now(), LocalTime.of(11, 0));
		LocalDateTime finishDate = startDate.plusDays(1);

		URI targetUrl = UriComponentsBuilder.fromUriString(base.toString()).path("/vote")
				.queryParam("poll",
						finishDate.format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
								+ "Seleção de Restaurante".hashCode())
				.queryParam("choice", "Restaurante B".hashCode()).queryParam("mail", "helenoa@gmail.com").build()
				.toUri();

		ResponseEntity<Poll> response = template.getForEntity(targetUrl, Poll.class);
		assertThat(response.getBody().getOptions().get(1).getMailVote().size(), equalTo(1));
	}
}