import { SafeHtmlPipe } from './safe-html.pipe';
import {DomSanitizer} from "@angular/platform-browser";
import {TestBed} from "@angular/core/testing";

describe('SafeHtmlPipe', () => {
  let pipe: SafeHtmlPipe;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [SafeHtmlPipe, DomSanitizer] });
  });

  it('create an instance', () => {
    pipe = TestBed.inject(SafeHtmlPipe);
    expect(pipe).toBeTruthy();
  });
});
