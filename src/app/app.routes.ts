import {Routes} from '@angular/router';
import {JobsComponent} from "./jobs/jobs.component";

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
        loadComponent: () => import('./jobs/job/job.component').then(m => m.JobComponent)
      }
    ]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  { path: '**', redirectTo: '/jobs' }
];
