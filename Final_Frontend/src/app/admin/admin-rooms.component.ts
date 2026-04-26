import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { RoomService } from '../shared/services/services';
import { HotelService } from '../shared/services/hotel.service';
import { Room, Hotel } from '../shared/models';

@Component({
  selector: 'app-admin-rooms',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-rooms.component.html',
})
export class AdminRoomsComponent implements OnInit {
  rooms: Room[] = [];
  hotel: Hotel | null = null;
  hotels: Hotel[] = [];
  hotelId: number | null = null;

  loading = true;
  showForm = false;
  editing = false;

  msg = '';
  error = '';

  form: Room = {
    hotelId: 0,
    type: 'Single',
    price: 0
  };

  roomTypes: Room['type'][] = ['Single', 'Double', 'Deluxe', 'Suite'];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('hotelId');

    if (id) {
      this.hotelId = Number(id);

      this.hotelService.getById(this.hotelId).subscribe(h => this.hotel = h);

      this.load(this.hotelId);
    }

    this.hotelService.getAll().subscribe(h => this.hotels = h);
  }

  loadAll(){
    this.loading=true;
    this.roomService.getAll().subscribe({
      next:r=>{
        this.rooms=r;
        this.loading = false;
      }
    })
  }

  load(hotelId:number) {
    this.loading = true;

    this.roomService.getByHotel(hotelId).subscribe({
      next: r => {
        this.rooms = r;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  openAdd() {
    this.form = {
      hotelId: this.hotelId || 0,
      type: 'Single',
      price: 0
    };

    this.editing = false;
    this.showForm = true;
    this.msg = '';
    this.error = '';
  }

  openEdit(room: Room) {
    this.form = {
      roomId: room.roomId,
      hotelId: room.hotelId,
      type: room.type,
      price: room.price
    };

    this.editing = true;
    this.showForm = true;
    this.msg = '';
    this.error = '';
  }

  save() {
    if (!this.form.price || this.form.price <= 0) {
      this.error = 'Valid price required.';
      return;
    }

    if (!this.form.roomId && this.editing) {
      this.error = 'Room ID missing.';
      return;
    }

    const obs = this.editing
      ? this.roomService.update(this.form.roomId!, this.form)
      : this.roomService.add(this.form);

    obs.subscribe({
      next: () => {
        this.msg = this.editing ? 'Room updated!' : 'Room added!';
        this.showForm = false;

        if (this.form.hotelId) {
          this.load(this.form.hotelId);
        }
      },
      error: () => this.error = 'Failed to save room.'
    });
  }

  delete(id: number) {
    if (!confirm('Delete this room?')) return;

    this.roomService.delete(id).subscribe({
      next: () => {
        this.rooms = this.rooms.filter(r => r.roomId !== id);
        this.msg = 'Room deleted.';
      },
      error: () => this.error = 'Cannot delete. Room may have bookings.'
    });
  }

  cancel() {
    this.showForm = false;
    this.error = '';
  }

  typeIcon(type: string): string {
    return {
      Single: '🛏️',
      Double: '🛏️🛏️',
      Deluxe: '✨',
      Suite: '👑'
    }[type] || '🏨';
  }
}