import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PatientDashboardComponent implements OnInit {
  patientId: string = '0';

  appointments: any[] = [
    { id: '1', date: '2025-05-10', time: '10:00 AM', doctor: 'Dr. Smith', status: 'Scheduled' },
    { id: '2', date: '2025-05-12', time: '02:00 PM', doctor: 'Dr. Jane', status: 'Confirmed' },
    { id: '3', date: '2025-05-15', time: '01:00 PM', doctor: 'Dr. Brown', status: 'Scheduled' }
  ];

  isLoading = false;
  error: string | null = null;

  patientProfile: {
    name: string;
    phone: string;
    address: string;
    photo: string;
  } = {
    name: 'John Doe',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp'
  };

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state?.patient) {
      this.patientProfile = { ...state.patient };
    }
  }

  cancelAppointment(appointmentId: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointments = this.appointments.filter(app => app.id !== appointmentId);
      alert('Appointment cancelled successfully');
    }
  }

  edit() {
    this.router.navigate(['/edit-patient-profile'], { state: { patient: this.patientProfile } });
  }
}
