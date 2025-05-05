import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { DoctorCardsComponent } from './components/doctor-cards/doctor-cards.component';
import { AppoitmentComponent } from './components/appoitment/appoitment.component';
import { DashboardComponent } from './components/Doctor-dashboard/dashboard.component';
import { EditPageComponent } from './components/edit-page/edit-page.component';
import { VideoChatComponent } from './components/video-chat/video-chat.component';
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
},

{
    path: 'video-chat', component: VideoChatComponent
}
];
