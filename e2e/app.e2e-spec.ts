import { TravelBugNgPage } from './app.po';

describe('travel-bug-ng App', function() {
  let page: TravelBugNgPage;

  beforeEach(() => {
    page = new TravelBugNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
