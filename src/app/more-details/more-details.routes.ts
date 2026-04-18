import { Routes } from '@angular/router';

export const moreDetailsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./more-details/more-details').then((m) => m.MoreDetails), // Lazy load the component
  },
];
