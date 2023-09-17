import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: '',
  standalone: true,
})
export class IconComponentMock {
  @Input()
  public set src(value: string) {}
}
