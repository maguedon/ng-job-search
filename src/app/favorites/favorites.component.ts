import {Component, inject, Signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Job} from "../jobs/job.model";
import {FavoritesService} from "./favorites.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  private readonly favoritesService: FavoritesService = inject(FavoritesService);
  protected readonly favoriteJobs: Signal<Job[]> = this.favoritesService.getFavorites();
}
