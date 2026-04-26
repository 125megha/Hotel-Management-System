import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar.component';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: "app.component.html",
  
})
export class AppComponent {
  // Hide navbar on login/register pages
  get showNav(): boolean {
    return !window.location.pathname.includes('/login') && !window.location.pathname.includes('/register');
  }
}
