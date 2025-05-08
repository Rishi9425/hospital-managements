import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface Doctor {
  id: string;
  name: string;
  phone: string;
  address: string;
  photo: string;
  specialization?: string;
  experience?: number;
}

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private readonly baseUrl = 'http://localhost:3000/api/doctor';

  // Mock doctors data for testing
  private mockDoctors: Doctor[] = [
    {
      id: 'd1',
      name: 'Dr. Sarah Johnson',
      phone: '555-123-4567',
      address: '123 Medical Center Blvd, Suite 101, New York, NY 10001',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Cardiologist',
      experience: 15
    },
    {
      id: 'd2',
      name: 'Dr. Michael Chen',
      phone: '555-234-5678',
      address: '456 Health Parkway, Suite 205, New York, NY 10002',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Neurologist',
      experience: 12
    },
    {
      id: 'd3',
      name: 'Dr. Emily Rodriguez',
      phone: '555-345-6789',
      address: '789 Wellness Drive, Suite 300, New York, NY 10003',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Pediatrician',
      experience: 10
    },
    {
      id: 'd4',
      name: 'Dr. James Wilson',
      phone: '555-456-7890',
      address: '321 Care Avenue, Suite 150, New York, NY 10004',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Dermatologist',
      experience: 8
    },
    {
      id: 'd5',
      name: 'Dr. Olivia Thompson',
      phone: '555-567-8901',
      address: '654 Health Street, Suite 220, New York, NY 10005',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Orthopedic Surgeon',
      experience: 14
    },
    {
      id: 'd6',
      name: 'Dr. Robert Kim',
      phone: '555-678-9012',
      address: '987 Medicine Road, Suite 400, New York, NY 10006',
      photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp',
      specialization: 'Psychiatrist',
      experience: 11
    }
  ];

  private mockAppointments: Appointment[] = [
    {
      id: 'a1',
      patientName: 'John Doe',
      date: '2025-05-10',
      time: '10:00 AM',
      status: 'Pending'
    },
    {
      id: 'a2',
      patientName: 'Jane Smith',
      date: '2025-05-11',
      time: '2:30 PM',
      status: 'Confirmed'
    },
    {
      id: 'a3',
      patientName: 'Robert Brown',
      date: '2025-05-12',
      time: '9:15 AM',
      status: 'Cancelled'
    },
    {
      id: 'a4',
      patientName: 'Emily Davis',
      date: '2025-05-13',
      time: '1:00 PM',
      status: 'Confirmed'
    }
  ];

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
   * Retrieves all appointments for the logged-in doctor
   * @returns Observable array of appointment objects
   */
  getDoctorAppointments(): Observable<Appointment[]> {
    //return this.http.get<any[]>(`${this.baseUrl}/appointments`);
    return of(this.mockAppointments);
  }

  /**
   * Retrieves all doctors (for displaying in doctor list)
   * @returns Observable array of doctor objects
   */
  getAllDoctors(): Observable<Doctor[]> {
    // For testing: return mock data
    // In production: return this.http.get<Doctor[]>(`${this.baseUrl}/all`);
    return of(this.mockDoctors);
  }
}