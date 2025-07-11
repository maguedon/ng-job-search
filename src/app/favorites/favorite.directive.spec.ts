import {FavoriteDirective} from './favorite.directive';
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, DebugElement, Signal, signal, WritableSignal} from "@angular/core";
import {FavoritesService} from "./favorites.service";
import {By} from "@angular/platform-browser";
import {Job} from "../jobs/job.model";

// === Test Component ===
@Component({
  template: `<span [appFavorite]="job"></span>`,
  standalone: true,
  imports: [FavoriteDirective],
})
class TestComponent {
  protected job: Job = {
    id: 103533,
    companyName: "Twilio",
    title: "Sales Support Representative",
    companyLogo: "https://interstate21.com/job-search-app/Twilio.jpg",
    reference: "103533-sales-support-representative-3",
    location: "UK",
    industries: ["Sales"],
    types: ["full-time"],
    description:
      "<p>Twilio is looking for a Sales Support Representative to join the Strategic Sales team. We’re looking for an intelligent, ambitious and talented individual who is keen to understand more about how large businesses operate; this role will provide insights on and windows into many aspects of Twilio’s sales motion as well as supporting the Sales reps with day to day activities.</p>\n<h2><strong>Responsibilities</strong></h2>\n<p>This role will see you supporting the Strategic Account Executives to be more efficient in hitting quota.</p>\n<ul>\n<li>This individual is ‘the glue’ between many different functions within the organization.</li>\n<li>Assisting Account Executives with numerous activities and processes along the entire sales cycle.</li>\n<li>Prepare Pricing and Deal Structure, use and master internal pricing tools.</li>\n<li>Engage with client stakeholders to ensure Proposal Bill Of Materials (OFs) are correct.</li>\n<li>Work with internal stakeholders to ensure all aspects throughout the sales process are smooth (Deal Desk, Contracts, Legal, Pre-Sales, Security requests) and to ensure the BOM and Contracts are accurate. You will deal with people, data sets and processes.</li>\n<li>Manage prioritization of key deals with Sales Management.</li>\n<li>Update / Oversee CRM records of accounts</li>\n<li>Support AEs to understand customers current usage and improvement opportunities (Monkey  Analytics for existing customers)</li>\n<li>Support the AEs with administrative tasks linked to billing, invoicing and support.</li>\n</ul>\n<h2><strong>Qualifications </strong></h2>\n<p>Not all applicants will have skills that match a job description exactly. Twilio values diverse experiences in other industries, and we encourage everyone who meets the required qualifications to apply. While having “desired” qualifications make for a strong candidate, we encourage applicants with alternative experiences to also apply. If your career is just starting or hasn&#8217;t followed a traditional path, don&#8217;t let that stop you from considering Twilio. We are always looking for people who will bring something new to the table!</p>\n<h2><strong>Required:</strong></h2>\n<ul>\n<li>Highly communicative and can work in a team to support the wider goals of the sales function.</li>\n<li>Experience working with G Drive and fluent in Google Docs, Google Sheets and Salesforce.</li>\n<li>You don’t need to have experience in a sales role, indeed this role has allowed previously individuals to pursue roles in Twilio in data analytics, sales or marketing however a desire to move into sales eventually is preferred.</li>\n<li>Organizational skills are important and the ability to work in a fast paced environment. This is not a quota carrying role.</li>\n</ul>\n<p><strong>Fluent in English. Additional languages are a plus particularly German, French or Spanish.</strong></p>\n<h2><strong>Location</strong></h2>\n<p>This position is based remotely from the United Kingdom.</p>\n<h2><strong>Travel </strong></h2>\n<p>We prioritize connection and opportunities to build relationships with our customers and each other. For this role, approximately 20% travel is anticipated to help you connect in-person in a meaningful way.</p>\n<h2><strong>What We Offer</strong></h2>\n<p>There are many benefits to working at Twilio, including, in addition to competitive pay, things like generous time-off, ample parental and wellness leave, healthcare, a retirement savings program, and much more. Offerings vary by location.</p>\n<h2><strong>Twilio thinks big. Do you?</strong></h2>\n<p>We like to solve problems, take initiative, pitch in when needed, and are always up for trying new things. That&#8217;s why we seek out colleagues who embody our values — something we call Twilio Magic. Additionally, we empower employees to build positive change in their communities by supporting their volunteering and donation efforts.</p>\n<p>So, if you&#8217;re ready to unleash your full potential, do your best work, and be the best version of yourself, apply now!</p>\n<p><strong>Twilio is proud to be an equal opportunity employer.</strong></p>\n<p>Twilio is proud to be an Equal Employment Opportunity and Affirmative Action employer. We do not discriminate based upon race, religion, color, national origin, sex (including pregnancy, childbirth, reproductive health decisions, or related medical conditions), sexual orientation, gender identity, gender expression, age, status as a protected veteran, status as an individual with a disability, genetic information, political views or activity, or other applicable legally protected characteristics. We also consider qualified applicants with criminal histories, consistent with applicable federal, state and local law. Additionally, Twilio participates in the E-Verify program in certain locations, as required by law.</p>",
    publishDate: "2024-02-24 08:30:27",
  };
}

// === Mock Service ===
class MockFavoritesService {
  private favorites: WritableSignal<Job[]> = signal<Job[]>([]);

  getFavorites(): Signal<Job[]> {
    return this.favorites.asReadonly();
  }

  addFavorite = jasmine.createSpy('addFavorite');
  removeFavorite = jasmine.createSpy('removeFavorite');

  setFavorites(jobs: Job[]) {
    this.favorites.set(jobs);
  }
}

describe('FavoriteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  let span: DebugElement[];

  let mockService: MockFavoritesService;


  beforeEach(() => {
    mockService = new MockFavoritesService();


    fixture = TestBed.configureTestingModule({
      imports: [FavoriteDirective, TestComponent],
      providers: [
        { provide: FavoritesService, useValue: mockService }
      ]
    }).createComponent(TestComponent);


    fixture.detectChanges();

    span = fixture.debugElement.queryAll(By.directive(FavoriteDirective));
  });

  it('should not be active', () => {
    mockService.setFavorites([]);
    fixture.detectChanges();
    expect(span[0].nativeElement.classList.contains('active')).toBeFalse();
  });

  it('should be active', () => {
    mockService.setFavorites([{
      id: 103533,
      companyName: "Twilio",
      title: "Sales Support Representative",
      companyLogo: "https://interstate21.com/job-search-app/Twilio.jpg",
      reference: "103533-sales-support-representative-3",
      location: "UK",
      industries: ["Sales"],
      types: ["full-time"],
      description:
        "<p>Twilio is looking for a Sales Support Representative to join the Strategic Sales team. We’re looking for an intelligent, ambitious and talented individual who is keen to understand more about how large businesses operate; this role will provide insights on and windows into many aspects of Twilio’s sales motion as well as supporting the Sales reps with day to day activities.</p>\n<h2><strong>Responsibilities</strong></h2>\n<p>This role will see you supporting the Strategic Account Executives to be more efficient in hitting quota.</p>\n<ul>\n<li>This individual is ‘the glue’ between many different functions within the organization.</li>\n<li>Assisting Account Executives with numerous activities and processes along the entire sales cycle.</li>\n<li>Prepare Pricing and Deal Structure, use and master internal pricing tools.</li>\n<li>Engage with client stakeholders to ensure Proposal Bill Of Materials (OFs) are correct.</li>\n<li>Work with internal stakeholders to ensure all aspects throughout the sales process are smooth (Deal Desk, Contracts, Legal, Pre-Sales, Security requests) and to ensure the BOM and Contracts are accurate. You will deal with people, data sets and processes.</li>\n<li>Manage prioritization of key deals with Sales Management.</li>\n<li>Update / Oversee CRM records of accounts</li>\n<li>Support AEs to understand customers current usage and improvement opportunities (Monkey  Analytics for existing customers)</li>\n<li>Support the AEs with administrative tasks linked to billing, invoicing and support.</li>\n</ul>\n<h2><strong>Qualifications </strong></h2>\n<p>Not all applicants will have skills that match a job description exactly. Twilio values diverse experiences in other industries, and we encourage everyone who meets the required qualifications to apply. While having “desired” qualifications make for a strong candidate, we encourage applicants with alternative experiences to also apply. If your career is just starting or hasn&#8217;t followed a traditional path, don&#8217;t let that stop you from considering Twilio. We are always looking for people who will bring something new to the table!</p>\n<h2><strong>Required:</strong></h2>\n<ul>\n<li>Highly communicative and can work in a team to support the wider goals of the sales function.</li>\n<li>Experience working with G Drive and fluent in Google Docs, Google Sheets and Salesforce.</li>\n<li>You don’t need to have experience in a sales role, indeed this role has allowed previously individuals to pursue roles in Twilio in data analytics, sales or marketing however a desire to move into sales eventually is preferred.</li>\n<li>Organizational skills are important and the ability to work in a fast paced environment. This is not a quota carrying role.</li>\n</ul>\n<p><strong>Fluent in English. Additional languages are a plus particularly German, French or Spanish.</strong></p>\n<h2><strong>Location</strong></h2>\n<p>This position is based remotely from the United Kingdom.</p>\n<h2><strong>Travel </strong></h2>\n<p>We prioritize connection and opportunities to build relationships with our customers and each other. For this role, approximately 20% travel is anticipated to help you connect in-person in a meaningful way.</p>\n<h2><strong>What We Offer</strong></h2>\n<p>There are many benefits to working at Twilio, including, in addition to competitive pay, things like generous time-off, ample parental and wellness leave, healthcare, a retirement savings program, and much more. Offerings vary by location.</p>\n<h2><strong>Twilio thinks big. Do you?</strong></h2>\n<p>We like to solve problems, take initiative, pitch in when needed, and are always up for trying new things. That&#8217;s why we seek out colleagues who embody our values — something we call Twilio Magic. Additionally, we empower employees to build positive change in their communities by supporting their volunteering and donation efforts.</p>\n<p>So, if you&#8217;re ready to unleash your full potential, do your best work, and be the best version of yourself, apply now!</p>\n<p><strong>Twilio is proud to be an equal opportunity employer.</strong></p>\n<p>Twilio is proud to be an Equal Employment Opportunity and Affirmative Action employer. We do not discriminate based upon race, religion, color, national origin, sex (including pregnancy, childbirth, reproductive health decisions, or related medical conditions), sexual orientation, gender identity, gender expression, age, status as a protected veteran, status as an individual with a disability, genetic information, political views or activity, or other applicable legally protected characteristics. We also consider qualified applicants with criminal histories, consistent with applicable federal, state and local law. Additionally, Twilio participates in the E-Verify program in certain locations, as required by law.</p>",
      publishDate: "2024-02-24 08:30:27",
    }]);
    fixture.detectChanges();
    expect(span[0].nativeElement.classList.contains('active')).toBeTrue();
  });
});
