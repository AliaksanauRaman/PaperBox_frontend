import { Injectable } from '@angular/core';

enum AppImage {
  LOGO_BIG_BETA = 'logo-big-beta',
  LOGO_SMALL_BETA = 'logo-small-beta',
}

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly _imagesMap = new Map<AppImage, HTMLImageElement>([]);

  public loadImages(): void {
    this.loadLogoBigBetaImage();
    this.loadLogoSmallBetaImage();
  }

  public getLogoBigBetaImage(): HTMLImageElement {
    const logoBigBetaImage = this._imagesMap.get(AppImage.LOGO_BIG_BETA);

    if (logoBigBetaImage === undefined) {
      throw new Error('Logo big beta image is not defined!');
    }

    return logoBigBetaImage;
  }

  public getLogoSmallBetaImage(): HTMLImageElement {
    const logoSmallBetaImage = this._imagesMap.get(AppImage.LOGO_SMALL_BETA);

    if (logoSmallBetaImage === undefined) {
      throw new Error('Logo small beta image is not defined!');
    }

    return logoSmallBetaImage;
  }

  private loadLogoBigBetaImage(): void {
    const infoImage = new Image(127, 38);
    infoImage.src = '/assets/images/logo_big_beta.png';
    this._imagesMap.set(AppImage.LOGO_BIG_BETA, infoImage);
  }

  private loadLogoSmallBetaImage(): void {
    const infoImage = new Image(29, 38);
    infoImage.src = '/assets/images/logo_small_beta.png';
    this._imagesMap.set(AppImage.LOGO_SMALL_BETA, infoImage);
  }
}
