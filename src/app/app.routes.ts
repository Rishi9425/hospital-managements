import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { DoctorCardsComponent } from './components/doctor-cards/doctor-cards.component';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { DashboardComponent } from './components/Doctor-dashboard/dashboard.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard, patientGuard, doctorGuard } from './guards/auth.guard';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PatientEditPageComponent } from './components/patient-edit-page/patient-edit-page.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { PatientSignupComponent } from './components/patient-signup/patient-signup.component';

export const routes: Routes = [
  // Public routes
  { path: '', component: DoctorCardsComponent },
  { path: 'login', component: LoginComponent },
  // {
  //   path: 'patient-login',
  //   component: PatientLoginComponent,
  //   },
  { path: 'signup', component: SignupComponent },

  // {path: 'patient-signup', component: PatientSignupComponent},
  // Protected patient routes
  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent, 
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
    canActivate: [patientGuard]
  },
  {
    path: 'edit-doctor-profile',
    component: EditPageComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-patient-profile',
    component: PatientEditPageComponent,
  },

  // Shared protected routes
  {
    path: 'video-chat',
    component: VideoChatComponent,
    canActivate: [authGuard]
  },

  // Redirect to appropriate dashboard if logged in
  // {
  //   // path: 'dashboard',
  //   // //canActivate: [authGuard],
  //   // loadChildren: () =>
  //   //   import('./features/dashboard.module').then(
  //   //     (m) => m.DashboardModule
  //   //   )
  //   path: 'patient-dashboard',
  //   component: PatientDashboardComponent,
  // },

  {
path: 'edit-page-patient',
component: PatientEditPageComponent,
  },

  // Fallback route
  { path: '**', redirectTo: '' }
];