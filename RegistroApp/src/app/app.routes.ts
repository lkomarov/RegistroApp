import { Routes } from '@angular/router';
import { loginGuard } from './guards/login.guard';
import { homeGuard } from './guards/home.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ingreso',
    pathMatch: 'full',
  },
  {
    path: 'map',
    loadComponent: () => import('./pages/map/map.page').then( m => m.MapPage),
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canActivate: [homeGuard]
  },
  {
    path: 'ingreso',
    loadComponent: () => import('./pages/ingreso/ingreso.page').then( m => m.IngresoPage),
    canActivate: [loginGuard]
  },
  {
    path: 'correo',
    loadComponent: () => import('./pages/correo/correo.page').then( m => m.CorreoPage)
  },
  {
    path: 'pregunta',
    loadComponent: () => import('./pages/pregunta/pregunta.page').then( m => m.PreguntaPage)
  },
  {
    path: 'mis-datos',
    loadComponent: () => import('./pages/mis-datos/mis-datos.page').then( m => m.MisDatosPage)
  },
  {
    path: 'correcto',
    loadComponent: () => import('./pages/correcto/correcto.page').then( m => m.CorrectoPage)
  },
  {
    path: 'incorrecto',
    loadComponent: () => import('./pages/incorrecto/incorrecto.page').then( m => m.IncorrectoPage)
  },
];
