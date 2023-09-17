import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PlaceListItemComponent } from './place-list-item.component';
import { IconComponent } from '../icon/icon.component';
import { IconComponentMock } from '../icon/icon.component.mock';

import {
  PATH_TO_ACTIVE_ARROW_ICON,
  PATH_TO_ARROW_ICON,
} from './place-list-item.config';
import { Place } from '@shared/types/place';
import { Country } from '@shared/types/country';
import { City } from '@shared/types/city';

const pathToArrowIcon = 'assets/arrow-icon.svg';
const pathToActiveArrowIcon = 'assets/arrow-icon-active.svg';
const country = new Country(1, 'Belarus');
const city = new City(1, country.id, 'Minsk');

describe('PlaceListItemComponent', () => {
  let fixture: ComponentFixture<PlaceListItemComponent>;
  let component: PlaceListItemComponent;
  let place: Place;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [PlaceListItemComponent],
      providers: [
        {
          provide: PATH_TO_ARROW_ICON,
          useValue: pathToArrowIcon,
        },
        {
          provide: PATH_TO_ACTIVE_ARROW_ICON,
          useValue: pathToActiveArrowIcon,
        },
      ],
    })
      .overrideComponent(PlaceListItemComponent, {
        remove: { imports: [IconComponent] },
        add: { imports: [IconComponentMock] },
      })
      .compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceListItemComponent);
    component = fixture.componentInstance;

    place = new Place(country, city);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should not add content--selected class if not selected', () => {
    component.isSelected = false;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.content')).classes[
        'content--selected'
      ]
    ).not.toBe(true);
  });

  it('should add content--selected class if selected', () => {
    component.isSelected = true;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.content')).classes[
        'content--selected'
      ]
    ).toBe(true);
  });

  it('should display city label', () => {
    component.place = place;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.city-label')).nativeElement
        .textContent
    ).toBe(place.getCityLabel());
  });

  it('should display country label', () => {
    component.place = place;

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('.country-label')).nativeElement
        .textContent
    ).toBe(place.getCountryLabel());
  });

  it('should display an arrow icon', () => {
    expect(fixture.debugElement.query(By.css('.arrow-icon'))).not.toBeNull();
  });

  it('should have normal arrow icon src if not selected', () => {
    component.isSelected = false;

    expect(component.arrowIconSrc()).toBe(pathToArrowIcon);
  });

  it('should have active arrow icon src if selected', () => {
    component.isSelected = true;

    expect(component.arrowIconSrc()).toBe(pathToActiveArrowIcon);
  });
});
