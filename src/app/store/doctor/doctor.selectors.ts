// src/app/store/doctor/doctor.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DoctorState } from './doctor.reducer';

export const selectDoctorState = createFeatureSelector<DoctorState>('doctor');

export const selectDoctor = createSelector(
  selectDoctorState,
  (state) => state.doctor
);
