import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { WizzardComponent } from './pages/wizzard/wizzard.component'; // Import WizzardComponent
import { authGuard } from './guards/auth.guard'; // Import the auth guard

export const routes: Routes = [
    { path: '', 
      loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) 
    },
    { 
      path: 'login', // Add the login route
      loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
      path: 'checkout', // Add the checkout route
      loadComponent: () => import('./pages/fast-checkout/fast-checkout.component').then(m => m.FastCheckoutComponent)
      // Consider adding authGuard if checkout is for logged-in users only,
      // or handle guest checkout logic within the component.
    },
    { path: 'wizzard', 
      loadComponent: () => import('./pages/wizzard/wizzard.component').then(m => m.WizzardComponent),
      canActivate: [authGuard] // Apply the guard to the wizzard route
    },
    {
      path: 'settings', // Add the settings route
      loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
      canActivate: [authGuard] // Also protect the settings route
    },
    {
      path: 'progress', // Add the progress analytics route
      loadComponent: () => import('./pages/progress-analytics/progress-analytics.component').then(m => m.ProgressAnalyticsComponent),
      canActivate: [authGuard] // Protect the progress route
    },
    { path: 'contact', 
      loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
    },
    { path: '**', redirectTo: '' }
  ];
