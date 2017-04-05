import { browser, element, by } from 'protractor';

export class PollRestaurantPage {

  getBrowser() {
    return browser;
  }

  navigateTo() {
    return browser.get('/');
  }

  getLinkFirstPoll() {
    return element(by.xpath('//*[@id="index-banner"]/div[2]/polls/div/div[1]/a'));
  }

  getRadioFirstOption(){
    return element(by.xpath('//*[@id="index-banner"]/div[2]/poll-details/div/div/div[2]/div/form/p[1]/label'));
  }

  getTextResultElement(){
    return element(by.xpath('//*[@id="index-banner"]/div[2]/poll-results/div/div/div[2]/div/form/p[1]'));
  }

  getLinkDoneElement() {
    return element(by.id('link-done'));
  }

  getTextPollElement() {
    return element(by.id('text-poll'));
  }

  getTextErrorElement() {
    return element(by.id('text-error'));
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

  getFinishDate(){
    let dateReturn: string = new Date().getFullYear()+'';
    if(new Date().getMonth()+''.length < 2)
      dateReturn += '0' + new Date().getMonth()+1;
    else 
      dateReturn += new Date().getMonth()+1;

    if(new Date().getDate()+''.length < 2)
      dateReturn += '0' + new Date().getDate()+1;
    else 
      dateReturn += new Date().getDate()+1;

    return dateReturn;
  }
}
