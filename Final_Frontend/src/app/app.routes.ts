import { Routes } from '@angular/router';
import { AuthGuard, AdminGuard } from './shared/guards/guards';

export const routes: Routes = [
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },

  // Auth
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  // Hotels (public)
  {
    path: 'hotels',
    loadComponent: () => import('./hotel/hotel-list.component').then(m => m.HotelListComponent)
  },
  {
    path: 'hotels/:id',
    loadComponent: () => import('./hotel/hotel-detail.component').then(m => m.HotelDetailComponent)
  },

  // User routes (protected)
  {
    path: 'booking',
    loadComponent: () => import('./booking/booking.component').then(m => m.BookingComponent),
    canActivate: [AuthGuard]
  },

  // Admin routes
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/hotels',
    loadComponent: () => import('./admin/admin-hotels.component').then(m => m.AdminHotelsComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/rooms/:hotelId',
    loadComponent: () => import('./admin/admin-rooms.component').then(m => m.AdminRoomsComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/rooms',
    loadComponent: () => import('./admin/admin-rooms.component').then(m => m.AdminRoomsComponent),
     canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/bookings',
    loadComponent: () => import('./admin/admin-bookings.component').then(m => m.AdminBookingsComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'admin/users',
    loadComponent: () => import('./admin/admin-users.component').then(m => m.AdminUsersComponent),
    canActivate: [AuthGuard, AdminGuard]
  },

  // Fallback
  { path: '**', redirectTo: '/hotels' }
];
