import { Routes } from '@angular/router';
import { JobsComponent } from "./jobs/jobs.component";
import { FavoritesComponent} from "./favorites/favorites.component";

export const routes: Routes = [
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '**', redirectTo: '/jobs' }
];
