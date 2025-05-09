import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  fullName: string;
  age: number;
  phoneNumber: string;
  userName: string;
  userType: 'patient' | 'doctor';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly baseUrl = 'http://localhost:3000/api';

  private userData = {
    "patients": [
        {
            "fullName": "Rishi Raghuwanshi",
            "age": 25,
            "phoneNumber": "9876543210",
            "password": "patient123",
            "userName": "rishi",
            "userType": "patient"
        },
        {
            "fullName": "Rahul Verma",
            "age": 28,
            "phoneNumber": "9988776655",
            "password": "rahul@456",
            "userName": "rahul",
            "userType": "patient"
        }
    ],
    "doctors": [
        {
            "fullName": "Arjun Mehta",
            "age": 45,
            "phoneNumber": "9876543211",
            "password": "doctor123",
            "userName": "arjun",
            "userType": "doctor"
        },
        {
            "fullName": "Sameer Gupta",
            "age": 50,
            "phoneNumber": "9988776656",
            "password": "sameer@456",
            "userName": "sameer",
            "userType": "Doctor"
        }
    ]
  };

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
        localStorage.removeItem('currentUser');
      }
    }
    return null;
  }

  
  login(userName: string, password: string, userType: 'patient' | 'doctor'): Observable<User> {
  return of(this.userData).pipe(
    map(data => {
  
      const userList = userType === 'patient' ? data.patients : data.doctors;

      // Find the user by username
      const user = userList.find((u: any) => u.userName.toLowerCase() === userName.toLowerCase());

      if (!user) {
        throw new Error('Invalid username');
      }

      // Check if the password matches
      if (user.password !== password) {
        throw new Error('Incorrect password');
      }

      // Check if the user type matches
      if (user.userType.toLowerCase() !== userType.toLowerCase()) {
        throw new Error('Incorrect user type');
      }

      
      const authenticatedUser: User = {
        fullName: user.fullName,
        age: user.age,
        phoneNumber: user.phoneNumber,
        userName: user.userName,
        userType: userType
      };

      // Store user in local storage
      localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
      this.currentUserSubject.next(authenticatedUser);

      return authenticatedUser;
    }),
    catchError(error => {
      console.error('Login failed', error.message);
      return throwError(() => new Error(error.message));
    })
  );
}
  signup(userData: any, userType: 'patient' | 'doctor'): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${userType}/signup`, userData)
      .pipe(
        tap(user => {
          // Add user type to the response
          const userWithType = { ...user, type: userType };
          
          // Store user details and token in local storage
          localStorage.setItem('currentUser', JSON.stringify(userWithType));
          this.currentUserSubject.next(userWithType);
          
          // Navigate to appropriate dashboard
          this.router.navigate([this.getDashboardRoute(userType)]);
          return userWithType;
        }),
        catchError(error => {
          console.error('Signup failed', error);
          return throwError(() => new Error('Registration failed. Please try again.'));
        })
      );
  }


  logout(): void {
    // Remove user from local storage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  getUserType(): 'patient' | 'doctor' | null {
    return this.currentUserValue?.userType || null;
  }

  getDashboardRoute(userType: 'patient' | 'doctor'): string {
    return userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard';
  }

  // Guard function for route protection
  canAccessDashboard(requiredType: 'patient' | 'doctor'): boolean {
    const user = this.currentUserValue;
    return !!user && user.userType === requiredType;
  }
}