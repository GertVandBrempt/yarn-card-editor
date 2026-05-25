import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sets',
    pathMatch: 'full',
  },
  {
    path: 'sets',
    loadComponent: () =>
      import('./pages/set-selector/set-selector.component').then(
        (m) => m.SetSelectorComponent
      ),
  },
  {
    path: 'sets/:setId',
    loadComponent: () =>
      import('./components/layout/layout.component').then(
        (m) => m.LayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/card-list/card-list.component').then(
            (m) => m.CardListComponent
          ),
      },
      {
        path: 'cards/new',
        loadComponent: () =>
          import('./components/card-editor/card-editor.component').then(
            (m) => m.CardEditorComponent
          ),
      },
      {
        path: 'cards/:cardId',
        loadComponent: () =>
          import('./components/card-editor/card-editor.component').then(
            (m) => m.CardEditorComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'sets',
  },
];
