import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DoctorCardsComponent } from './doctor-cards/doctor-cards.component';
import { AppoitmentComponent } from './appoitment/appoitment.component';
export const routes: Routes = [

    {
path: 'signup', component: SignupComponent
    },
{
    path: '', component: DoctorCardsComponent
},

{
    path: 'appoitment', component: AppoitmentComponent
}

];
