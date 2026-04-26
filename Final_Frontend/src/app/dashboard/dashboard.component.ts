import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardService, BookingService } from '../shared/services/services';
import { HotelService } from '../shared/services/hotel.service';

import { Booking } from '../shared/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  totalBookings: number = 0;
  totalRevenue: number = 0;
  bookingsPerHotel: { hotelName: string; count: number }[] = [];
  recentBookings: Booking[] = [];
  loading = true;
  maxCount = 1;

  constructor(
    private dashboardService: DashboardService,
    private bookingService: BookingService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    forkJoin({
      bookings: this.dashboardService.getTotalBookings(),
      revenue: this.dashboardService.getTotalRevenue(),
      perHotel: this.dashboardService.getBookingsPerHotel(),
      recent: this.bookingService.getAll()
    }).subscribe({
      next: ({ bookings, revenue, perHotel, recent }) => {


        this.totalBookings = (bookings as any)?.totalBookings ?? bookings ?? 0;
        this.totalRevenue = (revenue as any)?.totalRevenue ?? revenue ?? 0;

        this.bookingsPerHotel = perHotel ?? [];

        this.maxCount = this.bookingsPerHotel.length
          ? Math.max(...this.bookingsPerHotel.map(h => h.count), 1)
          : 1;

        this.recentBookings = (recent ?? []).slice(0, 5);

        this.loading = false;
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.loading = false;
      }
    });
  }

  barWidth(count: number): string {
    return `${Math.round((count / this.maxCount) * 100)}%`;
  }
}