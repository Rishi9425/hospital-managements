import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SignupComponent } from "./signup/signup.component";
import { DoctorCardsComponent } from "./doctor-cards/doctor-cards.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, RouterLink, DoctorCardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hospital-management';
}
