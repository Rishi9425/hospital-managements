import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';
import { AuthService } from '../service/auth.service';
import { PatientService } from '../service/patient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class PatientDashboardComponent implements OnInit {
  patientId: string = '';
  appointments: any[] = [];
  isLoading = true;
  error: string | null = null;
  patientProfile: any = null;

  // Chat functionality (if needed in patient dashboard)
  isChatOpen = false;
  isChatBtnActive = false;
  userMessage: string = '';
  botMessages: string[] = ['Welcome to our hospital management system. How can I help you today?'];

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Get patient ID from auth service
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.type === 'patient') {
      this.patientId = currentUser.id;
      this.fetchPatientData();
      this.fetchAppointments();
    } else {
      this.error = 'Unauthorized access.';
      this.isLoading = false;
    }
  }

  fetchPatientData() {
    this.patientService.getPatientProfile().subscribe({
      next: (data) => {
        this.patientProfile = data;
      },
      error: (err) => {
        console.error('Error fetching patient profile', err);
        this.error = 'Failed to load patient profile.';
      }
    });
  }

  fetchAppointments() {
    this.appointmentService.getPatientUpcomingAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching appointments', err);
        this.error = 'Failed to load appointments.';
        this.isLoading = false;
      }
    });
  }
  
  cancelAppointment(appointmentId: string) {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.appointmentService.cancelAppointment(appointmentId).subscribe({
        next: () => {
          // Remove the appointment from the list
          this.appointments = this.appointments.filter(app => app.id !== appointmentId);
          alert('Appointment cancelled successfully');
        },
        error: (err) => {
          console.error('Error cancelling appointment', err);
          alert('Failed to cancel appointment. Please try again.');
        }
      });
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    this.isChatBtnActive = this.isChatOpen;
  }

  sendMessage() {
    if (!this.userMessage.trim()) return;
    
    // Add user message to chat
    this.botMessages.push(`You: ${this.userMessage}`);
    const messageToSend = this.userMessage;
    this.userMessage = '';
    
    // Simulate bot response
    setTimeout(() => {
      let botResponse = 'I received your message. How can I help you with hospital management?';
      
      if (messageToSend.toLowerCase().includes('appointment')) {
        botResponse = 'Would you like to schedule an appointment? Please provide your preferred date and time.';
      } else if (messageToSend.toLowerCase().includes('doctor')) {
        botResponse = 'We have several specialists available. What type of doctor would you like to see?';
      } else if (messageToSend.toLowerCase().includes('medical')) {
        botResponse = 'Your medical records are accessible through the Medical Records section. Would you like to view them?';
      }
      
      this.botMessages.push(`Bot: ${botResponse}`);
    }, 500);
  }
}