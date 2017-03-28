import { PollRestaurantPage } from './app.po';

describe('poll-restaurant App', () => {
  let page: PollRestaurantPage;

  beforeEach(() => {
    page = new PollRestaurantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
