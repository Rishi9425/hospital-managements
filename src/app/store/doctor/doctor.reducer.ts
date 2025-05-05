import { createReducer, on } from '@ngrx/store';
import {
  loadDoctorSuccess,
  loadDoctorFailure,
  updateDoctorSuccess,
  updateDoctorFailure
} from './doctor.actions';

export interface DoctorState {
  doctor: any | null;
  error: any | null;
}

export const initialState: DoctorState = {
  doctor: null,
  error: null,
};

export const doctorReducer = createReducer(
  initialState,
  on(loadDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
  on(loadDoctorFailure, (state, { error }) => ({ ...state, error })),
  on(updateDoctorSuccess, (state, { doctor }) => ({ ...state, doctor, error: null })),
  on(updateDoctorFailure, (state, { error }) => ({ ...state, error }))
);
