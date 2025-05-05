import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DoctorService {

  private readonly baseUrl = 'http://localhost:3000/api/doctor';

  constructor(private readonly http: HttpClient) {}

  /**
   * Fetches a doctor's profile by ID.
   * @param id 
   * @returns 
  getDoctorProfile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile`);
  }

  /**
   * Updates the doctor's profile.
   * @param doctor Object containing updated doctor data.
   * @returns Observable of the updated doctor data.
   */
  updateDoctorProfile(doctor: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/profile`, doctor);
  }

  /**
   * Retrieves all patients assigned to a specific doctor.
   * @param doctorId Unique identifier of the doctor.
   * @returns Observable array of patient objects.
   */
  getAllPatientsForDoctor(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${doctorId}/patients`);
  }
}
