import { createAction, props } from '@ngrx/store';
import { Appointment } from './appointment.model';

export const loadAppointments = createAction('[Appointment] Load Appointments');
export const loadAppointmentsSuccess = createAction(
  '[Appointment] Load Appointments Success',
  props<{ appointments: Appointment[] }>()
);
export const loadAppointmentsFailure = createAction(
  '[Appointment] Load Appointments Failure',
  props<{ error: string }>()
);

export const bookAppointment = createAction(
  '[Appointment] Book Appointment',
  props<{ appointment: Appointment }>()
);
export const bookAppointmentSuccess = createAction(
  '[Appointment] Book Appointment Success',
  props<{ appointment: Appointment }>()
);
export const bookAppointmentFailure = createAction(
  '[Appointment] Book Appointment Failure',
  props<{ error: string }>()
);
