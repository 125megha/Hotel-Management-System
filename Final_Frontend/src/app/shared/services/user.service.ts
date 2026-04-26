import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${environment.apiUrl}/User/login`;
  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> { return this.http.get<User[]>(this.apiUrl); }
  getById(id: number): Observable<User> { return this.http.get<User>(`${this.apiUrl}/${id}`); }
}
