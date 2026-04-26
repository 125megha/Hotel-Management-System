import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, RouterModule } from "@angular/router";

import { HotelService } from "../shared/services/hotel.service";

import {
  RoomService,
  BookingService,
  RatingService,
} from "../shared/services/services";

import { AuthService } from "../shared/services/auth.service";

import { Hotel, Room, Rating, Booking } from "../shared/models";

@Component({
  selector: "app-hotel-detail",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./hotel-detail.component.html",
})
export class HotelDetailComponent implements OnInit {
  hotel: Hotel | null = null;
  rooms: Room[] = [];
  ratings: Rating[] = [];
  loading = true;

  // Booking form
  checkIn = "";
  checkOut = "";
  selectedRoom: Room | null = null;
  bookingMsg = "";
  bookingError = "";
  bookingLoading = false;
  availability: { [roomId: number]: boolean } = {};

  // Rating form
  myRating = 0;
  myReview = "";
  ratingMsg = "";

  constructor(
    private route: ActivatedRoute,
    public auth: AuthService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private ratingService: RatingService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.hotelService.getById(id).subscribe((h) => {
      this.hotel = h;
    });
    this.roomService.getByHotel(id).subscribe((r) => {
      this.rooms = r;
      this.loading = false;
    });
    this.ratingService.getByHotel(id).subscribe((r) => (this.ratings = r));
  }

  checkRoomAvailability() {
    if (!this.hotel?.hotelId || !this.checkIn || !this.checkOut) return;

    this.roomService
      .checkAvailability(this.hotel.hotelId, this.checkIn, this.checkOut)
      .subscribe((avail) => {
        console.log("Hotel availability:", avail);

        this.rooms.forEach((r) => {
          if (r.roomId) this.availability[r.roomId] = avail;
        });
      });
  }

  selectRoom(room: Room) {
    if (!this.auth.isLoggedIn) {
      this.bookingError = "Please sign in to book.";
      return;
    }
    this.selectedRoom = room;
    this.bookingError = "";
  }

  book() {
    if (!this.selectedRoom || !this.checkIn || !this.checkOut) {
      this.bookingError = "Please select dates and a room.";
      return;
    }
    const checkIn = new Date(this.checkIn);
    const checkOut = new Date(this.checkOut);
    if (checkOut <= checkIn) {
      this.bookingError = "Check-out must be after check-in.";
      return;
    }

    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    const total = nights * (this.selectedRoom.price || 0);

    this.bookingLoading = true;
    const booking: Booking = {
      userId: this.auth.currentUser!.userId!,
      roomId: this.selectedRoom.roomId!,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      totalAmount: total,
      paymentStatus: "Pending",
    };
    console.log(booking);

    this.bookingService.book(booking).subscribe({
      next: () => {
        this.bookingMsg = `Booking confirmed! ₹${total.toLocaleString()} for ${nights} night(s).`;
        this.bookingError = "";
        this.selectedRoom = null;
        this.bookingLoading = false;
      },
      error: (e) => {
        this.bookingError =
          e?.error?.message || "Room not available for selected dates.";
        this.bookingLoading = false;
      },
    });
  }

  submitRating() {
    if (!this.auth.isLoggedIn) return;
    
  const ratingPayload = {
    hotelId: this.hotel!.hotelId!,
    userId: this.auth.currentUser!.userId!,
    rating1: this.myRating,
    review: this.myReview?.trim() || "Good",
  };

     console.log("Rating payload:", ratingPayload);
    this.ratingService
      .add(ratingPayload)
      .subscribe({
        next: () => {
          this.ratingMsg = "Thank you for your review!";
          this.myReview = "";
          this.ratingService
            .getByHotel(this.hotel!.hotelId!)
            .subscribe((r) => (this.ratings = r));
        },
      });
  }

  get nights(): number {
    if (!this.checkIn || !this.checkOut) return 0;
    const d =
      (new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.max(0, Math.ceil(d));
  }

  get minDate(): string {
    return new Date().toISOString().split("T")[0];
  }

  roomTypeIcon(type: string): string {
    const icons: any = {
      Single: "🛏️",
      Double: "🛏️🛏️",
      Deluxe: "✨",
      Suite: "👑",
    };
    return icons[type] || "🏨";
  }
}
