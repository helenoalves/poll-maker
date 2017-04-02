import { PollRestaurantPage } from './app.po';

describe('poll-restaurant App', () => {
  let page: PollRestaurantPage;

  beforeEach(() => {
    page = new PollRestaurantPage();
  });

  it('should display message saying Poll Restaurant', () => {
    page.navigateTo();
    expect(page.getTextTitleElement().getText()).toEqual('Poll Restaurant');
  });

  it('should display input mail', () => {
    page.navigateTo();
    page.getInputMailElement().sendKeys('helenoa@gmail.com');
    page.getButtonLoginElement().click();
    expect(page.getTextPollElement().getText()).toEqual('Poll List');
  });  
});
