import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(
    private readonly router: Router,
  ) {}

  public async navigateToAdminMainPage(): Promise<boolean> {
    return this.router.navigate(['/admin/']);
  }
}

