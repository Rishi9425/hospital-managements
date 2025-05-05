import { Component } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appoitment',
  imports: [],
  templateUrl: './appoitment.component.html',
  styleUrl: './appoitment.component.css'
})
export class AppoitmentComponent {
  constructor(private router: Router) {}
appointment(){
  alert("Your appointment has been booked successfully!");
  this.router.navigate(['/doctor-cards']);
}
}
