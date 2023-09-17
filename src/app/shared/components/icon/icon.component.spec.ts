import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AngularSvgIconModule, SvgIconComponent } from 'angular-svg-icon';

import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let fixture: ComponentFixture<IconComponent>;
  let component: IconComponent;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [
        IconComponent,
        HttpClientTestingModule,
        AngularSvgIconModule.forRoot(),
      ],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should display svg icon component', () => {
    expect(
      fixture.debugElement.query(By.directive(SvgIconComponent))
    ).not.toBeNull();
  });

  it('should set proper src to the svg icon component', () => {
    const iconPath = 'assets/test/icon.svg';
    component.src = iconPath;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.directive(SvgIconComponent)).attributes[
        'ng-reflect-src'
      ]
    ).toBe(iconPath);
  });
});
