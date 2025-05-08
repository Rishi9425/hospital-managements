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
    if (nav?.extras.state && nav.extras.state['patient']) {
      this.patient = { ...nav.extras.state['patient'] };
    } else if (history.state?.patient) {
      this.patient = { ...history.state.patient };
    }
  }
  

  save() {
    history.state.patient.name = this.patient.name;
    history.state.patient.phone = this.patient.phone;
    history.state.patient.address = this.patient.address;
    history.state.patient.photo = this.patient.photo;
    this.router.navigate(['/patient-dashboard'], { state: { patient: this.patient } });
  }

  
}
