import { Routes } from '@angular/router';
import { SignupComponent } from './components/doctor-signup/signup.component';
import { DoctorCardsComponent } from './components/doctor-cards/doctor-cards.component';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { DashboardComponent } from './components/Doctor-dashboard/dashboard.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, patientGuard, doctorGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Public routes
  { path: '', component: DoctorCardsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:type', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup/:type', component: SignupComponent },

  // Protected patient routes
  {
    path: 'patient-dashboard',
    component: DashboardComponent, // Replace with PatientDashboardComponent if available
    canActivate: [patientGuard]
  },
  {
    path: 'medical-records',
    component: AppoitmentComponent, // Replace with MedicalRecordsComponent if available
    canActivate: [patientGuard]
  },

  // Protected doctor routes
  {
    path: 'doctor-dashboard',
    component: DashboardComponent,
    canActivate: [doctorGuard]
  },
  {
    path: 'appointments',
    component: AppoitmentComponent,
    canActivate: [doctorGuard]
  },
  {
    path: 'edit-page',
    component: EditPageComponent,
    canActivate: [authGuard]
  },

  // Shared protected routes
  {
    path: 'video-chat',
    component: VideoChatComponent,
    canActivate: [authGuard]
  },

  // Redirect to appropriate dashboard if logged in
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dashboard.module').then(
        (m) => m.DashboardModule
      )
  },

  // Fallback route
  { path: '**', redirectTo: '' }
];