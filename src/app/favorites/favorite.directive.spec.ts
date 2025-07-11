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
    id: 103530,
    companyName: "Sonatype",
    title: "Senior Technical Support Engineer",
    companyLogo: "https://interstate21.com/job-search-app/Sonatype.jpg",
    reference: "103530-senior-technical-support-engineer",
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
      id: 103530,
      companyName: "Sonatype",
      title: "Senior Technical Support Engineer",
      companyLogo: "https://interstate21.com/job-search-app/Sonatype.jpg",
      reference: "103530-senior-technical-support-engineer",
    }]);
    fixture.detectChanges();
    expect(span[0].nativeElement.classList.contains('active')).toBeTrue();
  });
});
