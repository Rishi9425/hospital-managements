// src/app/store/doctor/doctor.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { Doctor } from './doctor.model';
import { loadDoctor, updateDoctor } from './doctor.actions';

export interface DoctorState {
  doctor: Doctor;
}

export const initialState: DoctorState = {
  doctor: {
    name: 'John Doe',
    phone: '+91 22222222',
    address: '221B Baker Street, London',
    photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp'
  }
};

export const doctorReducer = createReducer(
  initialState,
  on(loadDoctor, (state, { doctor }) => ({ ...state, doctor })),
  on(updateDoctor, (state, { doctor }) => ({ ...state, doctor }))
);
