import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  doctor = {
    name: 'John Doe',
    phone: '+91 22222222',
    address: '221B Baker Street, London',
    photo: 'assets\images\male-doctor-smiling-happy-face-600nw-2481032615.webp'
  };

  constructor(private router: Router, private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state?.doctor) {
      this.doctor = { ...state.doctor };
    }
  }

  editpage() {
    this.router.navigate(['/edit-page'], { state: { doctor: this.doctor } });
  }
}
