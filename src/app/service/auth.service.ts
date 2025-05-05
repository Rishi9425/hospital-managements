

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth'; // Adjust based on your backend

  constructor(private http: HttpClient) {}

  // ✅ Add this login method
  login(credentials: { name: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  // Optional: registration or logout
  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
