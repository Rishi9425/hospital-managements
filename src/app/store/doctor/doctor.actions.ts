import { createAction, props } from '@ngrx/store';

export const loadDoctor = createAction('[Doctor] Load Doctor');
export const loadDoctorSuccess = createAction('[Doctor] Load Doctor Success', props<{ doctor: any }>());
export const loadDoctorFailure = createAction('[Doctor] Load Doctor Failure', props<{ error: any }>());

export const updateDoctor = createAction('[Doctor] Update Doctor', props<{ doctor: any }>());
export const updateDoctorSuccess = createAction('[Doctor] Update Doctor Success', props<{ doctor: any }>());
export const updateDoctorFailure = createAction('[Doctor] Update Doctor Failure', props<{ error: any }>());
