// src/app/store/doctor/doctor.actions.ts
import { createAction, props } from '@ngrx/store';
import { Doctor } from './doctor.model';

export const loadDoctor = createAction('[Doctor] Load Doctor', props<{ doctor: Doctor }>());
export const updateDoctor = createAction('[Doctor] Update Doctor', props<{ doctor: Doctor }>());
