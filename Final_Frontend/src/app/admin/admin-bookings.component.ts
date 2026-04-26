import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BookingService } from '../shared/services/services';

import { Booking } from '../shared/models';

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <div class="flex items-center justify-between mb-8">
    <div>
      <h1 class="section-title">All Bookings</h1>
      <p class="text-slate-500 text-sm mt-1">{{ bookings.length }} total bookings</p>
    </div>
    <a routerLink="/admin/dashboard" class="btn-secondary text-sm">← Dashboard</a>
  </div>

  <div *ngIf="msg" class="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-700">✓ {{ msg }}</div>

  <div *ngIf="loading" class="space-y-3">
    <div *ngFor="let i of [1,2,3,4,5]" class="card p-4 animate-pulse h-16"></div>
  </div>

  <div *ngIf="!loading" class="card overflow-hidden">
    <table class="w-full text-sm">
      <thead class="bg-slate-50 border-b border-slate-200">
        <tr>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600">#ID</th>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600">User</th>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600">Room</th>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600 hidden sm:table-cell">Dates</th>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600">Amount</th>
          <th class="text-left px-5 py-3.5 font-semibold text-slate-600">Status</th>
          <th class="text-right px-5 py-3.5 font-semibold text-slate-600">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let b of bookings" class="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
          <td class="px-5 py-3.5 text-slate-400">#{{ b.bookingId }}</td>
          <td class="px-5 py-3.5 font-medium text-slate-800">User {{ b.userId }}</td>
          <td class="px-5 py-3.5 text-slate-600">Room {{ b.roomId }}</td>
          <td class="px-5 py-3.5 text-slate-500 hidden sm:table-cell">
            {{ b.checkIn | date:'MMM d' }} – {{ b.checkOut | date:'MMM d, y' }}
          </td>
          <td class="px-5 py-3.5 font-semibold text-slate-800">₹{{ b.totalAmount | number }}</td>
          <td class="px-5 py-3.5">
            <span [class]="b.paymentStatus === 'Paid' ? 'badge-success' : 'badge-warning'">{{ b.paymentStatus }}</span>
          </td>
          <td class="px-5 py-3.5 text-right">
            <button (click)="cancel(b.bookingId!)" class="btn-danger text-xs py-1.5 px-3">Cancel</button>
          </td>
        </tr>
        <tr *ngIf="bookings.length === 0">
          <td colspan="7" class="text-center py-12 text-slate-400">No bookings found</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  `
})
export class AdminBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  msg = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.bookingService.getAll().subscribe({
      next: b => { this.bookings = b; this.loading = false; },
      error: () => this.loading = false
    });
  }

  cancel(id: number) {
    if (!confirm('Cancel this booking?')) return;
    this.bookingService.cancel(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.bookingId !== id);
        this.msg = 'Booking cancelled.';
        setTimeout(() => this.msg = '', 3000);
      }
    });
  }
}
