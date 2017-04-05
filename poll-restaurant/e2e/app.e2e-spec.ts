import { PollRestaurantPage } from './app.po';
import { ExpectedConditions } from "protractor/built";
import { ConfigService } from "app/configuracao/service/config.service";

describe('poll-restaurant App', () => {
  let page: PollRestaurantPage;

  beforeEach(() => {
    page = new PollRestaurantPage();
  });

  it('should display message saying Poll Restaurant', () => {
    page.navigateTo();
    expect(page.getTextTitleElement().getText()).toEqual('Poll Restaurants');
  });

  it('should connect with spring boot server online', () => {
    page.navigateTo();
    page.getInputMailElement().sendKeys('helenoa@gmail.com');
    page.getButtonLoginElement().click();

    expect(page.getTextErrorElement().getText()).not.toContain('Undefined Error on Server Access !');
  });

  it('should input mail and login', () => {
    page.navigateTo();
    page.getInputMailElement().sendKeys('helenoa@gmail.com');
    page.getButtonLoginElement().click();

    expect(page.getTextPollElement().getText()).toEqual('Poll List');
  });
  
  it('should vote in the first option', () => {
    page.navigateTo();
    page.getInputMailElement().sendKeys('helenoa@gmail.com');
    page.getButtonLoginElement().click();
    page.getLinkFirstPoll().click();

    page.getRadioFirstOption().click();
    page.getLinkDoneElement().click();

    expect(page.getTextResultElement().getText()).toContain('1');
  });    
});
