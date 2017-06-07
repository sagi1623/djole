import { AjkularAppPage } from './app.po';

describe('ajkular-app App', () => {
  let page: AjkularAppPage;

  beforeEach(() => {
    page = new AjkularAppPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
