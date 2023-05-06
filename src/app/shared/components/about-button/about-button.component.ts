import {
  ChangeDetectionStrategy,
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRippleModule } from '@angular/material/core';

import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html',
  styleUrls: ['./about-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [TranslateModule, MatTooltipModule, MatRippleModule],
})
export class AboutButtonComponent implements AfterViewInit {
  @ViewChild('aboutButtonRef')
  private readonly _aboutButtonElementRef!: ElementRef<HTMLButtonElement>;

  protected readonly _infoImage = this._imagesService.getInfoImage();

  constructor(private readonly _imagesService: ImagesService) {}

  public ngAfterViewInit(): void {
    this._aboutButtonElementRef.nativeElement.append(this._infoImage);
  }
}
