import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UniqueIdGeneratorService {
  public generate(): string {
    return Math.random().toString().slice(2);
  }
}
