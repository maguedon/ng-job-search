import {ComponentFixture, TestBed} from '@angular/core/testing';

import {JobComponent} from './job.component';
import {JobsService} from "../jobs.service";
import {of} from "rxjs";
import {ComponentRef} from '@angular/core'
import {DetailedJob} from "../detailed-job.model";

describe('JobComponent', () => {
  let component: JobComponent;
  let componentRef: ComponentRef<JobComponent>
  let fixture: ComponentFixture<JobComponent>;
  let jobsService: jasmine.SpyObj<JobsService>;

  const job: DetailedJob = {
    id: 103532,
    companyName: "Webflow",
    title: "Technical Support Associate",
    companyLogo: "https://interstate21.com/job-search-app/Webflow.jpg",
    reference: "103532-technical-support-associate",
    location: "Australia,  New Zealand",
    industries: ["Technical Support"],
    types: ["full-time"],
    description:
      "<p>At Webflow, our mission is to bring development superpowers to everyone. Webflow is the leading visual development platform for building powerful websites without writing code. By combining modern web development technologies into one platform, Webflow enables people to build websites visually, saving engineering time, while clean code seamlessly generates in the background. From independent designers and creative agencies to Fortune 500 companies, millions worldwide use Webflow to be more nimble, creative, and collaborative. It’s the web, made better.</p>\n<p>We’re looking for a Technical Support Associate to help empower our customers to do their best work and make Webflow the best product possible. Candidates can work <strong>either Weekdays (Mon &#8211;  Fri) or Weekends (Wed &#8211; Sun).</strong></p>\n<h2><strong>About the role </strong></h2>\n<ul>\n<li><strong>Location: Australia/New Zealand</strong></li>\n<li>Required time zones: APAC (Australia/New Zealand)</li>\n<li>Type: Full Time</li>\n<li>The cash compensation for this role is tailored to align with the cost of labor in different geographic markets. The base pay for this role ranges from AUD 97,300 &#8211; 105,000 for candidates based in Australia &amp; NZD 75,000 &#8211; 86,200 for candidates based in New Zealand. The specific base pay within the range will be determined by the candidate’s geographic location, job-related experience, knowledge, qualifications, and skills.</li>\n<li>Reporting<strong> </strong>to the Manager or Senior Manager of Customer Support</li>\n<li>Application Deadline: Wednesday, March 13, 2024</li>\n</ul>\n<p>As a Technical Support Associate, you’ll …</p>\n<ul>\n<li>Provide consistently high-quality customer experiences for all Webflow customers</li>\n<li>Help customers in support queues using applications including but not limited to Zendesk and Jira</li>\n<li>File bugs, troubleshoot product issues, and collaborate with the team to provide an excellent customer experience</li>\n<li>Advocate for our customers and work closely with your team and manager to find areas of improvement within our product and services.</li>\n</ul>\n<p>In addition to the responsibilities outlined above, at Webflow we will support you in identifying where your interests and development opportunities lie and we&#8217;ll help you incorporate them into your role.</p>\n<h2><strong>About you </strong></h2>\n<p>You’ll thrive as a Technical Support Associate if you:</p>\n<ul>\n<li>Have demonstrated experience with providing high-touch customer support over email, phones and live chat in SAAS or technical customer service</li>\n<li>Possess a deep understanding of Webflow products or have experience with other web design tools or platforms</li>\n<li>Understand HTML, CSS, DNS or have advanced understanding of Webflow</li>\n<li>Exhibit analytical reasoning and critical thinking skills for technical troubleshooting</li>\n<li>Have the ability to learn new digital tools quickly</li>\n<li>Work autonomously, creatively, and kindly with your teammates while empowering and supporting those around you</li>\n<li>Practice radical candor with your colleagues to communicate clearly. You can start from the common ground as a great listener and work towards creative solutions with others</li>\n<li>Advocate for others – including customers and colleagues – and you want to build a career in customer support!</li>\n<li>Have demonstrated written and verbal communication skills in the English language</li>\n</ul>\n<p>Even if you don’t meet 100% of the above qualifications, you should still seriously consider applying. Research shows that you may still be considered for a role if you meet just half of the requirements.</p>\n<h2><strong>Our Core Behaviors:</strong><strong><br />\n</strong></h2>\n<ul>\n<li><strong>Obsess over customer experience.</strong> We deeply understand <em>what</em> we’re building and <em>who</em> we’re building for and serving. We define the leading edge of what’s possible in our industry and deliver the future for our customers.</li>\n<li><strong>Move with heartfelt urgency.</strong> We have a healthy relationship with impatience, channeling it thoughtfully to show up better and faster for our customers and for each other. Time is the most limited thing we have, and we make the most of every moment.</li>\n<li><strong>Say the hard thing with care.</strong> Our best work often comes from intelligent debate, critique, and even difficult conversations. We speak our minds and don’t sugarcoat things — and we do so with respect, maturity, and care.</li>\n<li><strong>Make your mark.</strong> We seek out new and unique ways to create meaningful impact, and we champion the same from our colleagues. We work as a <em>team</em> to get the job done, and we go out of our way to celebrate and reward those going above and beyond for our customers and our teammates.</li>\n</ul>\n<h2><strong>Benefits &amp; Wellness</strong></h2>\n<p>Webflow has partnered with Remote.com to select and offer competitive country-specific benefits packages. Due to varying local packages and requirements, benefits globally do not necessarily mirror one another, but Webflow follows the practice of selecting premium benefits and covering the cost of team members and their dependent deduction costs. Perks and incentives are offered to benefits-eligible team members and any differences would occur if there are country-specific or compliance-related regulations.<em>.</em></p>\n<h2><strong>Be you, with us</strong></h2>\n<p>At Webflow, equality is a core tenet of our culture. We are committed to building an inclusive global team that represents a variety of backgrounds, perspectives, beliefs, and experiences. Employment decisions are made on the basis of job-related criteria without regard to race, color, religion, sex, sexual orientation, gender identity, national origin, disability, veteran status, or any other classification protected by applicable law.</p>\n<h2><strong>Stay connected</strong></h2>\n<p>Not ready to apply, but want to be part of the Webflow community? Consider following our story on our Webflow Blog, LinkedIn, Twitter, and/or Glassdoor.</p>\n<h2><strong>Please note:</strong></h2>\n<p><em>To join Webflow, you&#8217;ll need valid work authorization depending on the country of employment.</em></p>\n<p><em>If you are extended an offer, that offer may be contingent upon your successful completion of a background check, which will be conducted in accordance with applicable laws. We may obtain one or more background screening reports about you, solely for employment purposes.</em></p>",
    publishDate: "2024-02-24 08:28:17",
  };

  beforeEach(async () => {
    const jobsServiceSpy: jasmine.SpyObj<JobsService> = jasmine.createSpyObj('JobsService', ['getDetailedJob']);

    await TestBed.configureTestingModule({
      imports: [JobComponent],
      providers: [
        { provide: JobsService, useValue: jobsServiceSpy }
      ]
    })
    .compileComponents();

    jobsService = TestBed.inject(JobsService) as jasmine.SpyObj<JobsService>;
    jobsService.getDetailedJob.and.returnValue(of(job));

    fixture = TestBed.createComponent(JobComponent);
    component = fixture.componentInstance;

    componentRef = fixture.componentRef;
    componentRef.setInput('jobId', 103532);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
