import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer } from './app/store/auth/auth.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideStore(authReducer),
    provideAnimations() // Add this for animations support
  ]
}).catch(err => console.error(err));