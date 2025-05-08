import { Appointment } from './../../store/appointment/appointment.model';
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

@Injectable({ providedIn: 'root' })
export class PatientService {

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

  constructor(private http: HttpClient) {}

  getPatientProfile(): Observable<any> {
    return this.http.get<any>('/api/patient/profile');
  }

  getUpcomingAppointments(): Observable<Doctor[]> {
    return of(this.mockDoctors);
    //return this.http.get<any[]>('/api/patient/appointments');
  }
}