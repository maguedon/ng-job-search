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
    reference: "103533-sales-support-representative-3"
  };
}

// === Mock Service ===
class MockFavoritesService {
  private favorites: WritableSignal<Job[]> = signal<Job[]>([]);

  getFavorites(): Signal<Job[]> {
    return this.favorites.asReadonly();
  }

  addFavorite: () => void = jasmine.createSpy('addFavorite');
  removeFavorite: () => void = jasmine.createSpy('removeFavorite');

  setFavorites(jobs: Job[]): void {
    this.favorites.set(jobs);
  }
}

describe('FavoriteDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let span: DebugElement;
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

    span = fixture.debugElement.queryAll(By.directive(FavoriteDirective))[0];
  });

  it('should not be active', () => {
    mockService.setFavorites([]);
    fixture.detectChanges();

    expect(span.nativeElement.classList).not.toContain('active');
  });

  it('should be active', () => {
    mockService.setFavorites([{
      id: 103533,
      companyName: "Twilio",
      title: "Sales Support Representative",
      companyLogo: "https://interstate21.com/job-search-app/Twilio.jpg",
      reference: "103533-sales-support-representative-3"
    }]);
    fixture.detectChanges();

    expect(span.nativeElement.classList).toContain('active');
  });

  it('should remove favorite', () => {
    mockService.setFavorites([{
      id: 103533,
      companyName: "Twilio",
      title: "Sales Support Representative",
      companyLogo: "https://interstate21.com/job-search-app/Twilio.jpg",
      reference: "103533-sales-support-representative-3"
    }]);
    fixture.detectChanges();

    span.nativeElement.click();

    expect(mockService.removeFavorite).toHaveBeenCalled();
  });

  it('should add favorite', () => {
    mockService.setFavorites([]);
    fixture.detectChanges();

    span.nativeElement.click();

    expect(mockService.addFavorite).toHaveBeenCalled();
  });
});
