import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ApiService } from '../services/api.service';
import { SeoService } from '../services/SeoService';
import { StationsService } from '../services/stations.service';
import { routes } from './app.routes';

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
      withFetch(), // Fetch API instead of XHR
      // withInterceptors([authInterceptor]) // Add interceptors if needed
    ),
    
    // 4. SSR & Hydration
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
      includePostRequests: true
    })
    ),
    provideAnimations(),
    provideNativeDateAdapter(),
    StationsService,
    ApiService,
    SeoService,
  ]
};
