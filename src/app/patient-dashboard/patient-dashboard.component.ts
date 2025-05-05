import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../service/appointment.service';  // adjust path if needed
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PatientDashboardComponent implements OnInit {

  patientId: string = '';
  appointments: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')!;
    this.fetchAppointments();
  }

  fetchAppointments() {
    this.appointmentService.getAppointmentsByPatientId(this.patientId).subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load appointments.';
        this.isLoading = false;
      }
    });
  }
}
