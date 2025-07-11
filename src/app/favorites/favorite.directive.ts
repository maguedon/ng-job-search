import {computed, Directive, effect, ElementRef, HostListener, inject, input, InputSignal, Signal} from '@angular/core';
import {Job} from "../jobs/job.model";
import {FavoritesService} from "./favorites.service";

@Directive({
  selector: '[appFavorite]',
  standalone: true
})
export class FavoriteDirective {
  private el: ElementRef = inject(ElementRef);
  private favoritesService: FavoritesService = inject(FavoritesService);

  readonly job: InputSignal<Job> = input.required<Job>({alias: 'appFavorite'});

  private readonly favorites: Signal<Job[]> = this.favoritesService.getFavorites();
  private readonly isFavorite: Signal<boolean> = computed(() => this.favorites().some(j => j.id == this.job().id));

  constructor() {
    effect(() => {
        if (this.isFavorite()) {
          this.el.nativeElement.classList.add("active");
        } else {
          this.el.nativeElement.classList.remove("active");
        }
      }
    );
  }

  @HostListener('click')
  onClick(): void {
    if (this.isFavorite()) {
      this.favoritesService.removeFavorite(this.job());
    } else {
      this.favoritesService.addFavorite(this.job());
    }
  }
}
