import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  menuOpen = false;
  constructor(public auth: AuthService) {}
  logout() { this.auth.logout(); }
  get firstName(): string {
  return this.auth.currentUser?.name?.split(' ')[0] || '';
}
}
