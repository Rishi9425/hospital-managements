import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { doctorReducer } from './doctor/doctor.reducer';
import { VideoChatComponent } from '../video-chat/video-chat.component'; // standalone
import { NavbarComponent } from '../navbar/navbar.component'; // standalone
import { AppointmentEffects } from './appointment/appontment.effects';
//import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { appointmentReducer } from './appointment/appointment.reducer';
//import { AppointmentEffects } from './store/appointment/appointment.effects';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    NavbarComponent,
    VideoChatComponent,
    StoreModule.forRoot({ doctor: doctorReducer }),
    StoreModule.forRoot({appointment: appointmentReducer}),
    EffectsModule.forRoot([AppointmentEffects]),
    ],

})

export class AppModule {}
