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

  public async navigateToAdmin(): Promise<boolean> {
    return this.router.navigate(['/admin']);
  }
}
