import { ApplicationConfig, destroyPlatform, mergeApplicationConfig } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';

// ✅ Manually destroy any existing platform
try {
  destroyPlatform();
} catch {}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    provideNoopAnimations(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
