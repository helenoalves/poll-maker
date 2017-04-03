package org.poll.maker.business;

import static org.poll.maker.test.util.WiserAssertions.assertReceivedMessage;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.poll.maker.Application;
import org.poll.maker.model.Poll;
import org.poll.maker.model.PollMail;
import org.poll.maker.model.PollOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.subethamail.wiser.Wiser;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = Application.class)
public class PollBusinessTest {

	@Autowired
	private PollBusiness pollBusiness;

	private Wiser wiser;

	@Autowired
	private WebApplicationContext wac;
	private MockMvc mockMvc;

	@Before
	public void setUp() throws Exception {
		wiser = new Wiser();
		wiser.setPort(9090);
		wiser.start();
		mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
	}

	@After
	public void tearDown() throws Exception {
		wiser.stop();
	}

	@Test
	public void send() throws Exception {
		pollBusiness.sendMail("someone@localhost", "Teste Email", "Conteúdo teste unitario.");
		assertReceivedMessage(wiser).to("someone@localhost").withSubject("Teste Email")
				.withContent("Conteúdo teste unitario.");
	}

	@Test
	public void testPollScheduledFinish() throws InterruptedException {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm", Locale.US);

		LocalDateTime testDateTime = LocalDateTime.now();
		List<PollMail> mailList = new ArrayList<PollMail>();
		mailList.add(new PollMail().setMail("helenoa@gmail.com").setConfirmed(true));

		List<PollOption> optionsList = new ArrayList<PollOption>();
		optionsList.add(new PollOption().setDescription("Test Option").setMailVote(mailList));

		List<Poll> pollList = new ArrayList<Poll>();
		pollList.add(new Poll().setTitle("Test Poll").setFinish(testDateTime).setMailPermissions(mailList)
				.setOptions(optionsList));

		pollBusiness.setPolls(pollList);

		pollBusiness.pollScheduledFinish();

		assertReceivedMessage(wiser).to("helenoa@gmail.com")
				.containsSubject("Poll Maker: We have a winner for Test Poll " + formatter.format(testDateTime) + ".*");
	}
}
