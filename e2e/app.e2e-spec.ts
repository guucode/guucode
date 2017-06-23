import { GuucodePage } from './app.po';

describe('guucode App', () => {
  let page: GuucodePage;

  beforeEach(() => {
    page = new GuucodePage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
