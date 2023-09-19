import { Directive, Input, signal } from '@angular/core';

@Directive()
export abstract class BaseDropdownField {
  @Input()
  public set placeholder(value: string) {
    this._placeholder.set(value);
  }

  protected readonly _placeholder = signal(this.getDefaultPlaceholder());
  protected readonly _isPanelOpened = signal(false);

  protected getDefaultPlaceholder(): string {
    return '';
  }

  protected openPanel(): void {
    this._isPanelOpened.set(true);
  }

  protected closePanel(): void {
    this._isPanelOpened.set(false);
  }

  protected togglePanel(): void {
    if (this._isPanelOpened()) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }
}
