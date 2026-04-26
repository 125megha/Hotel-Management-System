# 🏨 Chill-In Hotel Booking System — Frontend

> Angular 17 + Tailwind CSS frontend for the Chill-In Hotel Booking capstone project.
> Inspired by Airbnb & Expedia design patterns.

---

## 📁 Project Structure

```
chill-in/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── login/              # Login page (split-screen design)
│   │   │   └── register/           # Registration page
│   │   ├── hotel/
│   │   │   ├── hotel-list.component.*     # Airbnb-style hotel grid
│   │   │   └── hotel-detail.component.*   # Room selection + booking + reviews
│   │   ├── booking/
│   │   │   └── booking.component.*        # My Bookings page
│   │   ├── dashboard/
│   │   │   └── dashboard.component.*      # Admin analytics dashboard
│   │   ├── admin/
│   │   │   ├── admin-hotels.component.*   # CRUD hotels
│   │   │   ├── admin-rooms.component.*    # CRUD rooms
│   │   │   ├── admin-bookings.component.* # View all bookings
│   │   │   └── admin-users.component.*    # View all users
│   │   └── shared/
│   │       ├── models/index.ts            # TypeScript interfaces
│   │       ├── services/                  # API service layer
│   │       │   ├── auth.service.ts
│   │       │   └── services.ts (Room/Booking/Rating/Payment/Dashboard)
│   │       ├── guards/guards.ts           # AuthGuard + AdminGuard
│   │       ├── interceptors/              # JWT auth interceptor
│   │       └── components/               # Navbar
│   ├── environments/
│   │   └── environment.ts              # ← Set your API URL here
│   ├── index.html
│   ├── main.ts
│   └── styles.css                      # Tailwind + custom component classes
├── angular.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and npm
- Angular CLI 17: `npm install -g @angular/cli`
- Your .NET backend running

### 1. Install dependencies
```bash
cd chill-in
npm install
```

### 2. Configure API URL
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7001/api'  // ← Your backend URL
};
```

### 3. Enable CORS in your .NET backend
In `Program.cs`, add before `app.Build()`:
```csharp
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngular", policy => {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```
And after `app.Build()`:
```csharp
app.UseCors("AllowAngular");
```

### 4. Run the app
```bash
ng serve
```
Open → [http://localhost:4200](http://localhost:4200)

---

## 🔑 Features by Role

### 👤 Public (No Login Required)
| Page | URL | Description |
|------|-----|-------------|
| Hotel Listing | `/hotels` | Browse all hotels with search + location filter |
| Hotel Detail | `/hotels/:id` | View rooms, ratings, descriptions |

### 🧑 User (Logged In)
| Page | URL | Description |
|------|-----|-------------|
| Hotel Booking | `/hotels/:id` | Select room + dates + confirm booking |
| My Bookings | `/booking` | View, pay, cancel own bookings |
| Reviews | `/hotels/:id` | Submit star rating + written review |

### 🔐 Admin
| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/admin/dashboard` | KPIs: bookings, revenue, charts |
| Hotels | `/admin/hotels` | Add / Edit / Delete hotels |
| Rooms | `/admin/rooms/:hotelId` | Add / Edit / Delete rooms per hotel |
| All Bookings | `/admin/bookings` | View & cancel all bookings |
| Users | `/admin/users` | View all registered users |

---

## 🎨 Design System

### Color Palette
- **Primary:** Orange (`brand-600` = `#ea580c`) — CTAs, highlights
- **Background:** Slate 50 (`#f8fafc`) — page background
- **Cards:** White with `shadow-card`
- **Text:** Slate 900/700/500 hierarchy

### Typography
- **Display:** `Playfair Display` (serif) — headings, hotel names
- **Body:** `DM Sans` — all UI text

### Reusable CSS Classes (in `styles.css`)
```css
.btn-primary     /* Orange filled button */
.btn-secondary   /* White bordered button */
.btn-danger      /* Red delete button */
.card            /* White rounded card with shadow */
.input-field     /* Styled form input */
.label           /* Form label */
.badge-success   /* Green badge */
.badge-warning   /* Amber badge */
.badge-info      /* Sky blue badge */
.section-title   /* Large Playfair heading */
.nav-link        /* Navbar link with hover */
```

---

## 🔗 API Endpoints Connected

| Service | Endpoints |
|---------|-----------|
| Auth | `POST /api/user/login`, `POST /api/user/register` |
| Hotels | `GET/POST/PUT/DELETE /api/hotel` |
| Rooms | `GET/POST/PUT/DELETE /api/room` |
| Bookings | `GET/POST/DELETE /api/booking` |
| Ratings | `GET/POST /api/rating` |
| Payment | `POST /api/payment/:bookingId` |
| Dashboard | `GET /api/dashboard/*` |

---

## 🛠️ Key Technical Decisions

- **Standalone Components** — No NgModules, Angular 17 style
- **Lazy Loading** — All routes use `loadComponent()` for fast initial load
- **Auth Interceptor** — Auto-attaches JWT Bearer token to every request
- **Route Guards** — `AuthGuard` (login required), `AdminGuard` (admin role)
- **LocalStorage** — User session stored as JSON; cleared on logout
- **Reactive Forms** — Using `FormsModule` with `ngModel` for simplicity

---

## 🧪 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@test.com | admin123 |
| User | john@test.com | 123456 |
| User | priya@test.com | 123456 |

---

## 📦 Build for Production

```bash
ng build --configuration production
```
Output in `dist/chill-in/` — deploy to any static host (Netlify, Vercel, IIS, Nginx).

---

## 🔧 Troubleshooting

| Issue | Fix |
|-------|-----|
| CORS errors | Enable CORS in your .NET `Program.cs` |
| API not found | Check `environment.ts` URL matches your backend port |
| Login fails | Ensure backend returns `{ user: {...} }` from `/api/user/login` |
| 404 on refresh | Configure server for HTML5 routing (add URL rewrite rules) |
| Tailwind not working | Run `npm install` to install `tailwindcss`, `autoprefixer`, `postcss` |
