import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
    photo: 'https://via.placeholder.com/120'
  };

  constructor(private location: Location) {}

  ngOnInit(): void {
    const state = this.location.getState() as any;
    if (state?.doctor) {
      this.doctor = { ...state.doctor };
    }
  }

  editpage() {
    history.pushState(null, '', '/edit-page'); // optional: clear old state
    window.location.href = '/edit-page';       // or use Router if needed
  }
}
