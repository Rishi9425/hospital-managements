import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as AppointmentActions from '../appointment/appointment.actions';
import { AppointmentService } from './appointment.service';

@Injectable()
export class AppointmentEffects {
  constructor(private actions$: Actions, private service: AppointmentService) {}

  loadAppointments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.loadAppointments),
      mergeMap(() =>
        this.service.getAppointments().pipe(
          map(appointments =>
            AppointmentActions.loadAppointmentsSuccess({ appointments })
          ),
          catchError(error =>
            of(AppointmentActions.loadAppointmentsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  bookAppointment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppointmentActions.bookAppointment),
      mergeMap(action =>
        this.service.bookAppointment(action.appointment).pipe(
          map(appointment =>
            AppointmentActions.bookAppointmentSuccess({ appointment })
          ),
          catchError(error =>
            of(AppointmentActions.bookAppointmentFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
