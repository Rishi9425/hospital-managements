import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DoctorCardsComponent } from './doctor-cards/doctor-cards.component';
import { AppoitmentComponent } from './appoitment/appoitment.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPageComponent } from './edit-page/edit-page.component';
export const routes: Routes = [

    {
path: 'signup', component: SignupComponent
    },
{
    path: '', component: DoctorCardsComponent
},

{
    path: 'appoitment', component: AppoitmentComponent
},
{
    path: 'dashboard', component: DashboardComponent
},

{
path: 'edit-page', component: EditPageComponent
}
];
