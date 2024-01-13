

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'; // Adjust the path based on your project structure

@Injectable({
  providedIn: 'root',
})


  export class AuthGuard {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.isAuthenticated(this.authService.username)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }