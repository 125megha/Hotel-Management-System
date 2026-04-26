import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User, LoginRequest, RegisterRequest } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/User`;
  private currentUserSubject = new BehaviorSubject<User | null>(this.loadUser());
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser(): User | null { return this.currentUserSubject.value; }
  get isLoggedIn(): boolean { return !!this.currentUser; }
  get isAdmin(): boolean { return this.currentUser?.role === 'Admin'; }

 login(credentials: LoginRequest): Observable<any> {
  return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
    tap(res => {
      const user: User = res.user ?? res;
      const token = res.token;   

      localStorage.setItem('chill_user', JSON.stringify(user));

      if (token) {
        localStorage.setItem('token', token); 
      }

      this.currentUserSubject.next(user);
    })
  );
}

  register(data: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    // localStorage.removeItem('chill_user');
    // localStorage.removeItem('token')
    localStorage.clear()
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  private loadUser(): User | null {
    try { return JSON.parse(localStorage.getItem('chill_user') || 'null'); }
    catch { return null; }
  }
}
