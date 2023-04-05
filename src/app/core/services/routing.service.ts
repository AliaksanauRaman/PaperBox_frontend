import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private readonly router: Router) {}

  public async navigateToHome(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public async navigateToAdminLogin(): Promise<boolean> {
    return this.router.navigate(['/admin/login']);
  }

  public async navigateToAdminHome(): Promise<boolean> {
    return this.router.navigate(['/admin']);
  }

  public async navigateToLogIn(): Promise<boolean> {
    return this.router.navigate(['/users-entry/log-in']);
  }

  public async navigateToSignup(): Promise<boolean> {
    return this.router.navigate(['/users-entry/signup']);
  }
}
