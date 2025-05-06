import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  photo: string;
  specialization?: string;
  experience?: number;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly baseUrl = 'http://localhost:3000/api/doctor';

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches a doctor's profile based on JWT token or saved ID
   * @returns Observable of doctor profile
   */
  getDoctorProfile(): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.baseUrl}/profile`);
  }

  /**
   * Updates the doctor's profile.
   * @param doctor Object containing updated doctor data.
   * @returns Observable of the updated doctor data.
   */
  updateDoctorProfile(doctor: Partial<Doctor>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.baseUrl}/profile`, doctor);
  }

  /**
   * Retrieves all patients assigned to a specific doctor.
   * @returns Observable array of patient objects.
   */
  getDoctorPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patients`);
  }

  /**
   * Retrieves all appointments for the logged-in doctor
   * @returns Observable array of appointment objects
   */
  getDoctorAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/appointments`);
  }

  /**
   * Get available time slots for a specific date
   * @param date Date to check availability
   * @returns Observable array of available time slots
   */
  getAvailableTimeSlots(date: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/availability?date=${date}`); 
  }
}