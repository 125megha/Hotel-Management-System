import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HotelService } from "../shared/services/hotel.service";
import { RatingService } from "../shared/services/services";
import { Hotel } from "../shared/models";


const HOTEL_IMAGES: { [key: string]: string } = {
  Chennai:
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&auto=format",
  Goa:
    "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&auto=format",
  Ooty:
    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&auto=format",
  Mumbai:
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&auto=format",
  Delhi:
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format",
  Coimbatore:
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&auto=format",
  Udaipur:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format",
  Jaipur:
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&auto=format",
  Hyderabad:
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&auto=format",
  Belanduru:
    "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&auto=format",
  Gokak:
    "https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600&auto=format",
  Kerala:
    "https://images.unsplash.com/photo-1576675784201-0e142b423952?w=600&auto=format",
  Bangalore:
    "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=600&auto=format",
  default:
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600&auto=format",
};

@Component({
  selector: "app-hotel-list",
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: "./hotel-list.component.html",
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] = [];
  filtered: Hotel[] = [];
  locations: string[] = [];
  selectedLocation = "";
  loading = true;
  searchQuery = "";

  constructor(
    private hotelService: HotelService,
    private ratingService: RatingService,
  ) {}

  ngOnInit() {
    this.hotelService.getAll().subscribe({
      next: (hotels) => {
        this.hotels = hotels.map((h) => ({
          ...h,
          imageUrl: this.getImage(h.location),
        }));
        this.filtered = this.hotels;
        this.locations = [...new Set(hotels.map((h) => h.location))];
        this.loadRatings();
        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  loadRatings() {
    this.hotels.forEach((h) => {
      if (h.hotelId) {
        this.ratingService.getAverage(h.hotelId).subscribe((avg) => {
          h.averageRating =
            typeof avg === "number" ? avg : ((avg as any)?.average ?? 0);
        });
      }
    });
  }

  filter() {
    this.filtered = this.hotels.filter((h) => {
      const matchLoc =
        !this.selectedLocation || h.location === this.selectedLocation;
      const matchQ =
        !this.searchQuery ||
        h.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchLoc && matchQ;
    });
  }

  clear() {
    this.selectedLocation = "";
    this.searchQuery = "";
    this.filtered = this.hotels;
  }

  getImage(location: string): string {
    return HOTEL_IMAGES[location] || HOTEL_IMAGES["default"];
  }

  stars(n: number): string[] {
    return Array(5)
      .fill("")
      .map((_, i) => (i < Math.round(n) ? "★" : "☆"));
  }
}
