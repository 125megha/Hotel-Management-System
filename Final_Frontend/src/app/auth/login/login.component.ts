import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.email || !this.password) { this.error = 'Please fill in all fields.'; return; }
    this.loading = true; this.error = '';
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        const user = this.auth.currentUser;
        this.router.navigate([user?.role === 'Admin' ? '/admin/dashboard' : '/hotels']);
      },
      error: (e) => { this.error = e?.error?.message || 'Invalid credentials. Please try again.'; this.loading = false; }
    });
  }
}
