import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  inject,
  signal,
} from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AngularSvgIconModule],
})
export class IconComponent {
  protected readonly _hostElement: ElementRef<HTMLElement> = inject(ElementRef);

  @Input({ required: true })
  public set src(value: string) {
    this._src.set(value);
  }

  protected readonly _src = signal('');
}
