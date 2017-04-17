import { P4Page } from './app.po';

describe('p4 App', () => {
  let page: P4Page;

  beforeEach(() => {
    page = new P4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
