import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Job} from "../jobs/job.model";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private readonly keyLocalStorage = 'favorites';

  private favorites: WritableSignal<Job[]> = signal(this.getFavoritesFromLocalStorage());

  getFavorites(): Signal<Job[]> {
    return this.favorites.asReadonly();
  }

  addFavorite(job: Job) {
    this.favorites.update(jobs => [...jobs, job]);
    this.setFavoritesToLocalStorage(this.favorites());
  }

  removeFavorite(job: Job) {
    this.favorites.update(jobs => jobs.filter(j => j.id !== job.id));
    this.setFavoritesToLocalStorage(this.favorites());
  }

  private setFavoritesToLocalStorage(favorites: Job[]) {
    localStorage.setItem(this.keyLocalStorage, JSON.stringify(favorites));
  }

  private getFavoritesFromLocalStorage(): Job[] {
    const jobsFromLS: string | null = localStorage.getItem(this.keyLocalStorage);
    if (jobsFromLS) {
      return JSON.parse(jobsFromLS) as Job[];
    }

    return [];
  }
}
