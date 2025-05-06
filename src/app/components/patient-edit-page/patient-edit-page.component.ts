import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-patient-edit-page',
  imports: [FormsModule],
  templateUrl: './patient-edit-page.component.html',
  styleUrl: './patient-edit-page.component.css'
})
export class PatientEditPageComponent {
  patient = {
    name: '',
    phone: '',
    address: '',
    photo: ''
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['doctor']) {
      this.patient = { ...nav.extras.state['doctor'] };
    } else if (history.state?.doctor) {
      this.patient = { ...history.state.patient };
    }
  }
  

  save() {
    history.state.doctor.name = this.patient.name;
    history.state.doctor.phone = this.patient.phone;
    history.state.doctor.address = this.patient.address;
    history.state.doctor.photo = this.patient.photo;
    this.router.navigate(['/patient-dashboard'], { state: { patient: this.patient } });
  }
}
