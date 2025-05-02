import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Appointment } from './appointment.model';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  getAppointments() {
    return of([]); // replace with HTTP call
  }

  bookAppointment(appointment: Appointment) {
    return of(appointment); // replace with HTTP POST
  }
}
