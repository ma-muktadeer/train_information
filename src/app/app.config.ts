import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApiService } from '../services/api.service';
import { SeoService } from '../services/SeoService';
import { StationsService } from '../services/stations.service';
import { routes } from './app.routes';
import { APP_CONFIG, appConfigValue } from './config/app-config';

// Define your custom date format
const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'dd-MMM-yyyy', // How user input is parsed
  },
  display: {
    dateInput: 'dd-MMM-yyyy', // How date is displayed in input
    monthYearLabel: 'MMM yyyy', // Month/year picker label
    dateA11yLabel: 'LL', // Screen reader format
    monthYearA11yLabel: 'MMMM yyyy', // Screen reader for month/year
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    // provideExperimentalZonelessChangeDetection(),
    // provideRouter(routes, withEnabledBlockingInitialNavigation()),
    // provideHttpClient(withFetch()),
    // provideClientHydration(withEventReplay())

    provideExperimentalZonelessChangeDetection(),

    // 2. Router Configuration
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(), // For SSR
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // Smooth scroll behavior
        anchorScrolling: 'enabled'
      }),
      // withDebugTracing() // Debugging only
    ),

    // 3. HTTP Client Configuration
    provideHttpClient(
      withFetch(),
      // withInterceptors([authInterceptor])
    ),

    // 4. SSR & Hydration
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includePostRequests: true
      })
    ),
    provideAnimations(),
    // provideNativeDateAdapter(),
    // // { provide: MAT_DATE_LOCALE, useValue: 'en-BN' },
    // { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    // { provide: DateAdapter, useClass: LuxonDateAdapter },
    // // provideLuxonDateAdapter(),
    // { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },

     provideLuxonDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: APP_CONFIG, useValue: appConfigValue },

    StationsService,
    ApiService,
    SeoService,
  ]
};
