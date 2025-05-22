import { Routes } from '@angular/router';
import { seoResolver } from '../services/SeoResolver';

export const routes: Routes = [
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
        })

    },


];
