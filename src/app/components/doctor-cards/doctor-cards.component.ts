import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-doctor-cards',
  imports: [],
  templateUrl: './doctor-cards.component.html',
  styleUrl: './doctor-cards.component.css'
})


export class DoctorCardsComponent {
  constructor(private router: Router) {}

  goToBookings() : void{
  this.router.navigate(['/appointments']);
}
}
