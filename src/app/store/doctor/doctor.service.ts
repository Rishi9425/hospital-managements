import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  constructor(private http: HttpClient) {}

  getDoctorProfile(): Observable<any> {
    return this.http.get('/api/doctor/profile');
  }

  updateDoctorProfile(data: any): Observable<any> {
    return this.http.put('/api/doctor/profile', data);
  }
}
