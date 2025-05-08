import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appoitment',
  templateUrl: './appoitment.component.html',
  styleUrls: ['./appoitment.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AppoitmentComponent {
  appointmentData = {
    name: '',
    date: '',
    time: '',
    phone: ''
  };

  constructor(private router: Router) {}

  appointment() {
    alert("Your appointment has been booked successfully!");
    this.router.navigate(['/doctor-cards']);
  }
}