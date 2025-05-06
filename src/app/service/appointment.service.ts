import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Patient-related appointment methods
  getAppointmentsByPatientId(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${patientId}/appointments`);
  }

  getPatientUpcomingAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/appointments/upcoming`);
  }

  scheduleAppointment(appointmentData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/appointments`, appointmentData);
  }

  cancelAppointment(appointmentId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/appointments/${appointmentId}`);
  }

  // Doctor-related appointment methods
  getDoctorAppointments(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/doctor/${doctorId}/appointments`);
  }

  getDoctorSchedule(doctorId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/doctor/${doctorId}/schedule`);
  }

  updateAppointmentStatus(appointmentId: string, status: string): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/appointments/${appointmentId}`, { status });
  }
}