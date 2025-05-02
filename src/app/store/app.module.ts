import { AppComponent } from './../app.component';
import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { doctorReducer } from './doctor/doctor.reducer';
import { VideoChatComponent } from '../video-chat/video-chat.component'; // standalone
import { NavbarComponent } from '../navbar/navbar.component'; // standalone

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    NavbarComponent,
    VideoChatComponent,
    StoreModule.forRoot({ doctor: doctorReducer }),
  ],

})
export class AppModule {}
