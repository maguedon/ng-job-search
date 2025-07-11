import { Routes } from '@angular/router';
import { JobsComponent } from "./jobs/jobs.component";
import { FavoritesComponent} from "./favorites/favorites.component";
import {JobComponent} from "./job/job.component";

export const routes: Routes = [
  {
    path: 'jobs',
    children: [
      {
        path: '',
        component: JobsComponent
      },
      {
        path: ':jobId',
        component: JobComponent
      }
    ]
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '**', redirectTo: '/jobs' }
];
