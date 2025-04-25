import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-page',
  imports: [FormsModule],
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent {
  doctor = {
    name: '',
    phone: '',
    address: '',
    photo: ''
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['doctor']) {
      this.doctor = { ...nav.extras.state['doctor'] };
    }
  }

  save() {
    history.state.doctor.name = this.doctor.name;
    history.state.doctor.phone = this.doctor.phone;
    history.state.doctor.address = this.doctor.address;
    this.router.navigate(['/dashboard'], { state: { doctor: this.doctor } });
  }
}
