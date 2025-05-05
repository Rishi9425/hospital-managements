import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  constructor(private http: HttpClient) {}

  bookAppointment(data: any): Observable<any> {
    return this.http.post('/api/appointments', data);
  }

  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>('/api/appointments');
  }
}
