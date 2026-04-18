import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
  },
  // in additon, you are loading the more details lazily.
  {
    path: 'more',
    loadChildren: () =>
      import('./more-details/more-details.routes').then(
        (m) => m.moreDetailsRoutes
      ),
  },
  {
    path: 'realtor-profile',
    loadComponent: () =>
      import('./realtor-profile-modal/realtor-profile-modal').then(
        (m) => m.RealtorProfileModal
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/home' }, // catch-all route for undefined paths
  // handling lazy load routes
];
