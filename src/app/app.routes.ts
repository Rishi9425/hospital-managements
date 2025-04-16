import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DoctorCardsComponent } from './doctor-cards/doctor-cards.component';
export const routes: Routes = [

    {
path: 'signup', component: SignupComponent
    },
{
    path: '', component: DoctorCardsComponent
}

];
