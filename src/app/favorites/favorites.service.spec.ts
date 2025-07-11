import {TestBed} from '@angular/core/testing';

import {FavoritesService} from './favorites.service';
import {Signal} from "@angular/core";
import {Job} from "../jobs/job.model";

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should manage favorites', () => {
    localStorage.removeItem('favorites');

    // Check favorites are empty at start
    let favoritesSignal: Signal<Job[]> = service.getFavorites();

    expect(favoritesSignal()).not.toBeNull();
    expect(favoritesSignal()).toHaveSize(0);
    let lsValue: string | null = localStorage.getItem('favorites');
    expect(lsValue).toBeNull();


    // Adding 2 favorites
    const favorites: Job[] = [
      {
        id: 80831,
        companyName: "SmartLogic",
        title: "Software Developer",
        companyLogo: "https://interstate21.com/job-search-app/SmartLogic.jpg",
        reference: "80831-software-developer-10",
      },
      {
        id: 91478,
        companyName: "Anonos",
        title: "Product Content Marketer (f/m/d)",
        companyLogo: "https://interstate21.com/job-search-app/Anonos.jpg",
        reference: "91478-product-content-marketer-f-m-d",
      }
    ];

    service.addFavorite(favorites[0]);
    service.addFavorite(favorites[1]);

    favoritesSignal = service.getFavorites();
    const result: Job[] = favoritesSignal();

    expect(result).toHaveSize(2);
    expect(result).toEqual(favorites);

    lsValue = localStorage.getItem('favorites');
    expect(lsValue).not.toBeNull();
    expect(JSON.parse(lsValue!) as Job[]).toHaveSize(2);


    // Removing favorites
    service.removeFavorite(favorites[0]);
    service.removeFavorite(favorites[1]);
    expect(favoritesSignal()).toHaveSize(0);
    lsValue = localStorage.getItem('favorites');
    expect(lsValue).not.toBeNull();
    expect(JSON.parse(lsValue!) as Job[]).toHaveSize(0);
  });
});
