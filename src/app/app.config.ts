import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
     // 1. Experimental Features
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
      withEventReplay()
    ),
    
    // 5. Animations
    provideAnimations(),
    
    // 6. Add other providers here
    // { provide: SOME_TOKEN, useValue: someValue }
    
    // For Material 3, consider adding:
    // provideMaterial3Theme()
  ]
};
