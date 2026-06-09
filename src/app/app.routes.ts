import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home').then((m) => m.Home),
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
  { path: '**', redirectTo: '/home' }, 
];
