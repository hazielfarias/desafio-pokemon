import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    children: [
      {
        path: 'details/:pokemon',
        loadComponent: () =>
          import(
            './shared/pokemon-detail-modal/pokemon-detail-modal.component'
          ).then((m) => m.PokemonDetailModalComponent),
      },
    ],
  },
];
