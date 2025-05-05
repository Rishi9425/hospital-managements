import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, FormsModule],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('in => out', animate('300ms ease-out')),
      transition('out => in', animate('300ms ease-in'))
    ])
  ]
})
export class DashboardComponent implements OnInit {
  doctor = {
    name: 'Dr. John Doe',
    phone: '+91 22222222',
    address: '221B Baker Street, London',
    photo: 'assets/images/male-doctor-smiling-happy-face-600nw-2481032615.webp'
  };

  // Chat functionality
  isChatOpen = false;
  isChatBtnActive = false;
  userMessage: string = '';
  botMessages: string[] = ['Welcome to our hospital management system. How can I help you today?'];

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
  
  call() {
    this.router.navigate(['/video-chat']);
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
      } else if (messageToSend.toLowerCase().includes('patient')) {
        botResponse = 'You currently have 2 patients in your list. Would you like to see their details?';
      }
      
      this.botMessages.push(`Bot: ${botResponse}`);
    }, 500);
  }
}