import { Component, OnInit, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  userType: 'patient' | 'doctor' | null = null;
  notificationCount = 0;
  isMenuOpen = false;
  activeDropdown: string | null = null;
  isMobile = window.innerWidth <= 768;
  
  constructor() {}
  
  ngOnInit() {
    // Check if the user is logged in
    this.checkLoginStatus();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    
    // Close dropdowns when window is resized
    if (!this.isMobile) {
      this.activeDropdown = null;
      this.removeActiveClasses();
    }
  }

  // Track clicks outside elements to close dropdowns
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (this.isMobile && this.activeDropdown) {
      const target = event.target as HTMLElement;
      
      // Check if click was outside of dropdown area
      const isDropdownClick = target.closest('.dropdown-toggle') || target.closest('.dropdown-menu');
      
      if (!isDropdownClick) {
        this.activeDropdown = null;
        this.removeActiveClasses();
      }
    }
  }
  
  checkLoginStatus() {
    // Example implementation - replace with your actual auth logic
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      const user = JSON.parse(userJson);
      this.isLoggedIn = true;
      this.userType = user.type;
      this.notificationCount = this.userType === 'doctor' ? 5 : 2;
    }
  }
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    
    // Reset dropdowns when closing menu
    if (!this.isMenuOpen) {
      this.activeDropdown = null;
      this.removeActiveClasses();
    }
  }
  
  toggleDropdown(event: Event, dropdown: string) {
    event.preventDefault();
    event.stopPropagation();
    
    // Only toggle dropdown in mobile view
    if (this.isMobile) {
      if (this.activeDropdown === dropdown) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = dropdown;
      }
      
      this.updateDropdownClasses();
    }
  }
  
  private updateDropdownClasses() {
    // Remove active class from all dropdowns
    this.removeActiveClasses();
    
    // Add active class to current dropdown
    if (this.activeDropdown) {
      const activeToggle = document.querySelector(`[data-dropdown="${this.activeDropdown}"]`);
      if (activeToggle) {
        activeToggle.classList.add('active');
      }
    }
  }
  
  private removeActiveClasses() {
    const allToggles = document.querySelectorAll('.dropdown-toggle');
    allToggles.forEach(toggle => toggle.classList.remove('active'));
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.isLoggedIn = false;
    this.userType = null;
    this.notificationCount = 0;
    
    // Close mobile menu if open
    if (this.isMenuOpen) {
      this.toggleMenu();
    }
  }
}