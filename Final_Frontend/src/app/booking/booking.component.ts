import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { BookingService } from "../shared/services/services";
import { PaymentService } from "../shared/services/services";

import { AuthService } from "../shared/services/auth.service";

import { Booking } from "../shared/models";

@Component({
  selector: "app-booking",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./booking.component.html",
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  loading = true;
  cancelMsg = "";
  payMsg = "";

  constructor(
    private bookingService: BookingService,
    private paymentService: PaymentService,
    public auth: AuthService,
  ) {}

  ngOnInit() {
    const userId = this.auth.currentUser?.userId!;
    this.bookingService.getByUser(userId).subscribe({
      next: (b) => {
        this.bookings = b;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  cancel(id: number) {
    if (!confirm("Cancel this booking?")) return;
    this.bookingService.cancel(id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter((b) => b.bookingId !== id);
        this.cancelMsg = "Booking cancelled successfully.";
        setTimeout(() => (this.cancelMsg = ""), 3000);
      },
    });
  }

 // booking.component.ts
// booking.component.ts
pay(bookingId: number) {
  const booking = this.bookings.find(b => b.bookingId === bookingId);
  if (!booking) return;

  // ✅ Create the object matching your provided schema
  const paymentData = {
    bookingId: bookingId,
    amount: booking.totalAmount,
    paymentDate: new Date().toISOString().split('T')[0], // Formats as YYYY-MM-DD
    status: "Paid"
  };

  this.paymentService.process(bookingId, paymentData).subscribe({
    next: () => {
      booking.paymentStatus = "Paid";
      this.payMsg = "Payment processed successfully!";
      setTimeout(() => (this.payMsg = ""), 3000);
    },
    error: (err) => {
      console.error(err);
      this.payMsg = "Error: " + (err.error?.message || "Check console for details");
    }
  });
}



  nights(checkIn: string, checkOut: string): number {
    return Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24),
    );
  }
}
