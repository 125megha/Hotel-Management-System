import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HotelService } from '../shared/services/hotel.service';
import { Hotel } from '../shared/models';

@Component({
  selector: 'app-admin-hotels',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './admin-hotels.component.html',
})
export class AdminHotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  loading = true;
  showForm = false;
  editing = false;
  msg = '';
  error = '';

  // ✅ include hotelId for update
  form: any = {
    hotelId: null,
    name: '',
    location: '',
    description: ''
  };

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading = true;
    this.hotelService.getAll().subscribe({
      next: (h) => {
        this.hotels = h;
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  openAdd() {
    this.form = {
      hotelId: null,
      name: '',
      location: '',
      description: ''
    };
    this.editing = false;
    this.showForm = true;
    this.msg = '';
    this.error = '';
  }

  openEdit(hotel: Hotel) {
    // ✅ FIX: include ALL required fields
    this.form = {
      hotelId: hotel.hotelId,
      name: hotel.name,
      location: hotel.location,
      description: hotel.description
    };

    this.editing = true;
    this.showForm = true;
    this.msg = '';
    this.error = '';
  }

  save() {
    if (!this.form.name || !this.form.location) {
      this.error = 'Name and location are required.';
      return;
    }

    // ✅ send only required fields
    const payload = {
      name: this.form.name,
      location: this.form.location,
      description: this.form.description
    };

    const obs = this.editing
      ? this.hotelService.update(this.form.hotelId, payload)
      : this.hotelService.add(payload);

    obs.subscribe({
      next: () => {
        this.msg = this.editing ? 'Hotel updated!' : 'Hotel added!';
        this.showForm = false;
        this.load();
      },
      error: () => (this.error = 'Failed to save hotel.'),
    });
  }

  delete(id: number) {
    if (!confirm('Delete this hotel?')) return;

    this.hotelService.delete(id).subscribe({
      next: () => {
        this.hotels = this.hotels.filter((h) => h.hotelId !== id);
        this.msg = 'Hotel deleted.';
      },
      error: () => (this.error = 'Failed to delete hotel.'),
    });
  }

  cancel() {
    this.showForm = false;
    this.error = '';
  }
}