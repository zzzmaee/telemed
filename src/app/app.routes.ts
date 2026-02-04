import {Routes} from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {MainLayoutComponent} from './core/layout/main-layout/main-layout.component';

export const routes: Routes = [
  {path: 'login', loadComponent: () => import('./core/login/login.component').then(c => c.LoginComponent)},
  {
    path: '',
    component: MainLayoutComponent,
    canActivate:[authGuard],
    children: [
      {path: '', redirectTo: 'arm', pathMatch: 'full'},
      {
        path: 'arm',
        loadComponent: () => import('./pages/arm/arm.component').then(c => c.ARMComponent)
      }
    ]
  },
  {path: '**', redirectTo: 'login'},
];
