import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: HomeComponent },
  { path: 'tutorial', component: HomeComponent },
  { path: 'layout',
    loadComponent: () =>
      import('./pages/layout/layout.component').then(m => m.LayoutComponent)
    },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
];
