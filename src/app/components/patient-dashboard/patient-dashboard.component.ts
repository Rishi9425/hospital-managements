import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common'; 
import { Router } from '@angular/router';
import { PatientService, Doctor} from '../../service/patient-service/patient.service'; // Adjust the path as necessary

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PatientDashboardComponent implements OnInit {
  patientId: string = '0';
  appointments: any[] = [];
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

  constructor(
    private router: Router,
    private location: Location,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state?.patient) {
      this.patientProfile = { ...state.patient };
    }

    this.loadAppointments();
  }

  loadAppointments() {
    this.isLoading = true;
    this.patientService.getUpcomingAppointments().subscribe({
      next: (doctors: Doctor[]) => {
        this.appointments = doctors.map((doc, index) => ({
          id: `a${index + 1}`,
          date: `2025-05-${10 + index}`,
          time: `${10 + index}:00 AM`,
          doctor: doc.name,
          status: index % 2 === 0 ? 'Scheduled' : 'Confirmed',
          specialization: doc.specialization,
          experience: doc.experience,
          photo: doc.photo,
          phone: doc.phone,
          address: doc.address
        }));
        this.isLoading = false;
      },
      error: err => {
        this.error = 'Failed to load appointments.';
        this.isLoading = false;
      }
    });
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
