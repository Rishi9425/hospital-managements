import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DoctorService, Appointment } from '../../service/doctor-service/doctor.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit {
  doctor = {
    name: 'Dr. John Doe',
    phone: '+91 22222222',
    address: '221B Baker Street, London',
    photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp'
  };

  appointments: Appointment[] = [];

  constructor(
    private router: Router,
    private location: Location,
    private doctorService: DoctorService
  ) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state?.doctor) {
      this.doctor = { ...state.doctor };
    }

    this.doctorService.getDoctorAppointments().subscribe((data) => {
      this.appointments = data;
    });
  }

  editpage() {
    this.router.navigate(['/edit-doctor-profile'], { state: { doctor: this.doctor } });
  }

  call() {
    this.router.navigate(['/video-chat']);
  }
  
}
