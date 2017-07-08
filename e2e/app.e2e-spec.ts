import { MystorePage } from './app.po';

describe('mystore App', () => {
  let page: MystorePage;

  beforeEach(() => {
    page = new MystorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
