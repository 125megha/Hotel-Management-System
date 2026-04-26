import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class HotelService {
  private apiUrl = `${environment.apiUrl}/Hotel`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/all`);
  }

  // 

  getById(id: number): Observable<Hotel> {
    const tempUrl = "https://localhost:7282/api/Room/hotel"
    return this.http.get<Hotel>(`${tempUrl}/${id}`);
  }

  getByLocation(location: string): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(`${this.apiUrl}/location/${location}`);
  }

  add(hotel: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, hotel);
  }

  update(id: number, hotel: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, hotel);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}