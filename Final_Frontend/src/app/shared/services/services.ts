import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, Booking, Rating, DashboardSummary } from '../models';
import { environment } from '../../../environments/environment';

// ── Room Service ──────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class RoomService {
  private apiUrl = `${environment.apiUrl}/Room`;

  constructor(private http: HttpClient) {}

  getByHotel(hotelId: number): Observable<Room[]> {
      // 'https://localhost:7265/api/Room/hotel/1' \

    return this.http.get<Room[]>(`${this.apiUrl}/hotel/${hotelId}`);
  }

  getById(id: number): Observable<Room> {
    return this.http.get<Room>(`${this.apiUrl}/${id}`);
  }

  getAll(){
    return this.http.get<Room[]>(`${this.apiUrl}/rooms`);
  }

  add(room: Room): Observable<any> {
    const payload = {
      hotelId: room.hotelId,
      type: room.type,
      price: room.price
    };

    return this.http.post(`${this.apiUrl}/addRoom`, payload);
  }

  update(roomId: number, room: Room): Observable<any> {
    const payload = {
      type: room.type,
      price: room.price
    };

    return this.http.put(`${this.apiUrl}/${roomId}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteRoom/${id}`);
  }

  checkAvailability(hotelId: number, checkIn: string, checkOut: string): Observable<boolean> {
    const params = new HttpParams()
      .set('checkIn', checkIn)
      .set('checkOut', checkOut);

    return this.http.get<boolean>(
      `${environment.apiUrl}/Hotel/${hotelId}/available-rooms`,
      { params }
    );
  }

  getAvailableRooms(hotelId: number, checkIn: string, checkOut: string): Observable<Room[]> {
    const params = new HttpParams()
      .set('checkIn', checkIn)
      .set('checkOut', checkOut);

    return this.http.get<Room[]>(
      `${environment.apiUrl}/Hotel/${hotelId}/available-rooms`,
      { params }
    );
  }
}
// ── Booking Service ───────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class BookingService {
//  private apiUrl_booking = `${environment.apiUrl}/Booking`;
  constructor(private http: HttpClient) {}

  private apiUrl_booking = 'https://localhost:7282/api/Booking'
  
  book(booking: Booking): Observable<any> { return this.http.post(`${this.apiUrl_booking}`, booking); }
  
  getByUser(userId: number): Observable<Booking[]> { return this.http.get<Booking[]>(`${this.apiUrl_booking}/user/${userId}`); }
  getAll(): Observable<Booking[]> { return this.http.get<Booking[]>(`${this.apiUrl_booking}/GetAllBookings`); }
  getById(id: number): Observable<Booking> { return this.http.get<Booking>(`${this.apiUrl_booking}/GetAllBookings/${id}`); }
  cancel(id: number): Observable<any> { return this.http.delete(`${this.apiUrl_booking}/${id}`); }

}

// ── Rating Service ────────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class RatingService {
  private apiUrl = `${environment.apiUrl}/Rating`;
  constructor(private http: HttpClient) {}

  add(rating: Rating): Observable<any> { return this.http.post(this.apiUrl, rating); }
  getByHotel(hotelId: number): Observable<Rating[]> { return this.http.get<Rating[]>(`${this.apiUrl}/hotel/${hotelId}`); }
  getAverage(hotelId: number): Observable<number> { return this.http.get<number>(`${this.apiUrl}/average/${hotelId}`); }
}

// ── Payment Service ───────────────────────────────────────────
// services.ts
@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/Payment`;
  constructor(private http: HttpClient) {}

  // ✅ Pass paymentData as the body of the POST request
  process(bookingId: number, paymentData: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/${bookingId}`, paymentData); 
  }
}

// ── Dashboard Service ─────────────────────────────────────────
@Injectable({ providedIn: 'root' })
export class DashboardService {
  // private apirUrl = " Booking/GetAllBookings";
  private apiUrl = `https://localhost:7282/api/Dashboard`;
  constructor(private http: HttpClient) {}
  getTotalBookings(): Observable<number> { return this.http.get<number>(`${this.apiUrl}/total-bookings`); }
  getTotalRevenue(): Observable<number> { return this.http.get<number>(`${this.apiUrl}/total-revenue`); }
  getBookingsPerHotel(): Observable<{ hotelName: string; count: number }[]> {
    return this.http.get<any[]>(`${this.apiUrl}/bookings-per-hotel`);
  }
}
