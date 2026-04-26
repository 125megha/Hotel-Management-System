import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
<div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
  <div class="w-full max-w-md animate-slide-up">
    <div class="text-center mb-8">
      <a routerLink="/" class="inline-flex items-center gap-2 mb-6">
        <div class="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
          </svg>
        </div>
        <span class="font-display font-semibold text-xl text-slate-900">Chill<span class="text-brand-600">-In</span></span>
      </a>
      <h1 class="text-3xl font-display font-semibold text-slate-900 mb-2">Create your account</h1>
      <p class="text-slate-500 text-sm">Join thousands of travellers finding their perfect stay.</p>
    </div>

    <div class="card p-8">
      <div *ngIf="error" class="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{{ error }}</div>
      <div *ngIf="success" class="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">
        Account created! <a routerLink="/login" class="font-medium underline">Sign in now →</a>
      </div>

      <div class="space-y-5">
        <div>
          <label class="label">Full name</label>
          <input type="text" [(ngModel)]="name" class="input-field" placeholder="John Doe"/>
        </div>
        <div>
          <label class="label">Email address</label>
          <input type="email" [(ngModel)]="email" class="input-field" placeholder="you@example.com"/>
        </div>
        <div>
          <label class="label">Password</label>
          <input type="password" [(ngModel)]="password" class="input-field" placeholder="Min. 6 characters"/>
        </div>
        <button (click)="register()" [disabled]="loading"
                class="w-full btn-primary py-3 flex items-center justify-center gap-2 text-base">
          <svg *ngIf="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </button>
      </div>
    </div>

    <p class="mt-5 text-center text-sm text-slate-500">
      Already have an account? <a routerLink="/login" class="text-brand-600 font-medium hover:underline">Sign in</a>
    </p>
  </div>
</div>
  `
})
export class RegisterComponent {
  name = ''; email = ''; password = '';
  loading = false; error = ''; success = false;

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.name || !this.email || !this.password) { this.error = 'Please fill in all fields.'; return; }
    if (this.password.length < 6) { this.error = 'Password must be at least 6 characters.'; return; }
    this.loading = true; this.error = '';
    this.auth.register({ name: this.name, email: this.email, password: this.password, role: 'User' }).subscribe({
      next: () => { this.success = true; this.loading = false; },
      error: (e) => { this.error = e?.error?.message || 'Registration failed. Please try again.'; this.loading = false; }
    });
  }
}
