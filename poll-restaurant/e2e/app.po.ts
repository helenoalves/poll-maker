import { browser, element, by } from 'protractor';

export class PollRestaurantPage {
  navigateTo() {
    return browser.get('/');
  }

  getTextPollElement() {
    return element(by.id('text-poll'));
  }

  getTextTitleElement() {
    return element(by.id('text-title'));
  }

  getInputMailElement() {
    return element(by.id('input-mail'));
  }

  getButtonLoginElement() {
    return element(by.id('button-login'));
  }
}
