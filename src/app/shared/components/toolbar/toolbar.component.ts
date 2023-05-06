import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

import { ToolsComponent } from '../tools/tools.component';
import { MenuButtonComponent } from '../menu-button/menu-button.component';

import { ScreenSizeObserverService } from '../../../core/services/screen-size-observer.service';
import { ImagesService } from '../../services/images.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', animate('250ms', style({ opacity: 0 }))),
    ]),
  ],
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink, ToolsComponent, MenuButtonComponent],
})
// TODO: Probably it needs to be refactored
export class ToolbarComponent implements AfterViewInit {
  @Input()
  public set userIsLoggedIn(value: boolean) {
    this._userIsLoggedIn = value;
  }

  private _currentLogoImageContainerRef?: ElementRef<HTMLAnchorElement>;

  @ViewChild('logoImageContainerRef')
  private set logoImageContainerRef(
    value: ElementRef<HTMLAnchorElement> | undefined
  ) {
    this._currentLogoImageContainerRef = value;
  }

  protected _userIsLoggedIn = false;
  protected _isMenuOpened = false;
  protected readonly _isMobileOrTablet$ =
    this._screenSizeObserverService.isMobileOrTablet$;

  constructor(
    private readonly _screenSizeObserverService: ScreenSizeObserverService,
    private readonly _imagesService: ImagesService,
    private readonly _renderer2: Renderer2,
    private readonly _cdRef: ChangeDetectorRef
  ) {}

  public ngAfterViewInit(): void {
    this.renderLogo();
  }

  protected handleMenuButtonClick(): void {
    this._isMenuOpened = !this._isMenuOpened;
    this._cdRef.detectChanges();
    this.renderLogo();
  }

  private renderLogo(): void {
    if (this._isMenuOpened) {
      const imageToAppend = this._imagesService.getLogoSmallBetaImage();
      this._renderer2.setStyle(imageToAppend, 'position', 'relative');
      this._renderer2.setStyle(imageToAppend, 'top', '-1px');
      this._currentLogoImageContainerRef?.nativeElement.append(imageToAppend);
    } else {
      const imageToAppend = this._imagesService.getLogoBigBetaImage();
      this._currentLogoImageContainerRef?.nativeElement.append(imageToAppend);
    }
  }
}
