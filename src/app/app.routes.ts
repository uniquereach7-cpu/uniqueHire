import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home').then(m => m.Home),
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./about-us/about-us').then(m => m.Aboutus)
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./services/services').then(m => m.Services)
  },
  {
    path: 'careers',
    loadComponent: () =>
      import('./career/career').then(m => m.Career)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./contact/contact').then(m => m.Contact)
  },
  {
    path: 'gcc',
    loadComponent: () =>
      import('./gcc/gcc').then(m => m.Gcc)
  },

  // fallback
  { path: '**', redirectTo: '' }
];
