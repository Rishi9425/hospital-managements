import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AppointmentService {
  private baseurl = 'http://localhost:3000/api/appointment';

  constructor(private http: HttpClient) {}

  bookAppointment(data: any): Observable<any> {
    return this.http.post( `${this.baseurl}/book`, data);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>('/api/appointments');
  }
  getAppointmentsByPatientId(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseurl}/patient/${patientId}`);
  }
}