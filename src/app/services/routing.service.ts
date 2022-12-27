import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    private readonly router: Router,
  ) {}

  public async navigateToHomePage(): Promise<boolean> {
    return this.router.navigate(['/']);
  }

  public async navigateToAdminLoginPage(): Promise<boolean> {
    return this.router.navigate(['/admin/login']);
  }

  public async navigateToAdminMainPage(): Promise<boolean> {
    return this.router.navigate(['/admin/main']);
  }
}

