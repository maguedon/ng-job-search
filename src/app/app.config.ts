import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {provideHttpClient, withFetch} from '@angular/common/http';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch())
  ]
};
