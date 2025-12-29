import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadComponent: () => import('./shared/components/splash/splash').then(m => m.SplashComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./shared/components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'test-supabase',
    loadComponent: () => import('./features/test-supabase/test-supabase').then(m => m.TestSupabaseComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'app01-relevamiento-visual',
    loadComponent: () => import('./features/app01-relevamiento-visual/relevamiento-visual/relevamiento-visual').then(m => m.RelevamientoVisual),
    canActivate: [authGuard]
  },
  {
    path: 'app02-tabla-didactica',
    loadComponent: () => import('./features/app02-tabla-didactica/tabla-didactica/tabla-didactica').then(m => m.TablaDidactica),
    canActivate: [authGuard]
  },
  {
    path: 'app03-alarma-robo',
    loadComponent: () => import('./features/app03-alarma-robo/alarma-robo/alarma-robo').then(m => m.AlarmaRobo),
    canActivate: [authGuard]
  },
  {
    path: 'app04-juego-memoria',
    loadComponent: () => import('./features/app04-juego-memoria/juego-memoria/juego-memoria').then(m => m.JuegoMemoria),
    canActivate: [authGuard]
  },
  {
    path: 'app05-carga-credito',
    loadComponent: () => import('./features/app05-carga-credito/carga-credito/carga-credito').then(m => m.CargaCredito),
    canActivate: [authGuard]
  },
  {
    path: 'app06-chat-aula',
    loadComponent: () => import('./features/app06-chat-aula/chat-aula/chat-aula').then(m => m.ChatAula),
    canActivate: [authGuard]
  },
  {
    path: 'app07-admin-usuarios',
    loadComponent: () => import('./features/app07-admin-usuarios/admin-usuarios/admin-usuarios').then(m => m.AdminUsuarios),
    canActivate: [authGuard]
  },
  {
    path: 'app08-visualizador-kinetico',
    loadComponent: () => import('./features/app08-visualizador-kinetico/visualizador-kinetico/visualizador-kinetico').then(m => m.VisualizadorKinetico),
    canActivate: [authGuard]
  },
  {
    path: 'app09-juego-kinetico',
    loadComponent: () => import('./features/app09-juego-kinetico/juego-kinetico/juego-kinetico').then(m => m.JuegoKinetico),
    canActivate: [authGuard]
  },
  {
    path: 'app10-control-gastos',
    loadComponent: () => import('./features/app10-control-gastos/control-gastos/control-gastos').then(m => m.ControlGastos),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'splash'
  }
];
