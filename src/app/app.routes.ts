import { Routes } from '@angular/router';
import { seoResolver } from '../services/SeoResolver';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => LoginComponent,
    data: {
      title: 'Train Matrix login',
      description: 'Train Matrix login',
      keywords: 'Train Matrix login',
      robots: 'index, follow',
      canonical: 'https://example.com/login'
    },
    pathMatch: 'full',
    resolve: { seo: seoResolver },
    // For prerendering (static routes)
    ...(typeof ngDevMode === 'undefined' || ngDevMode ? {} : {
      data: {
        revalidate: 3600
      }
    }),
  },
  {
    path: 'train-matrix',
    loadComponent: () => import('./pages/train-matrix/train-matrix.component').then(m => m.TrainMatrixComponent),
    data: {
      title: 'Train Matrix',
      description: 'Train Matrix',
      keywords: 'Train Matrix',
      robots: 'index, follow',
      canonical: 'https://example.com/train-matrix'
    },
    pathMatch: 'full',
    resolve: { seo: seoResolver },
    // For prerendering (static routes)
    ...(typeof ngDevMode === 'undefined' || ngDevMode ? {} : {
      data: {
        revalidate: 3600
      }
    }),

  },
  {
    path: 'train-details', loadComponent: () => import('./pages/train-details/train-details.component').then(m => m.TrainDetailsComponent),
    data: {
      title: 'Train Details',
      description: 'Train Details',
      keywords: 'Train Details',
      robots: 'index, follow',
      canonical: 'https://example.com/train-details'
    },
    pathMatch: 'full',
    resolve: { seo: seoResolver },
    ...(typeof ngDevMode === 'undefined' || ngDevMode ? {} : {
      data: {
        revalidate: 3600
      }
    }),
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }

];
