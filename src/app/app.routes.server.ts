import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'login',
    renderMode: RenderMode.Server,
  },
  {
    path: 'train-matrix',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'train-details',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
