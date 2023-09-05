import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ApplicationCardFullNameComponent } from './application-card-full-name.component';

describe('ApplicationCardFullNameComponent', () => {
  let fixture: ComponentFixture<ApplicationCardFullNameComponent>;
  let component: ApplicationCardFullNameComponent;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [ApplicationCardFullNameComponent],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationCardFullNameComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should render empty text if no full name is provided', () => {
    const hostElement: HTMLElement = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(hostElement.textContent).toBe('');
  });

  it('should render provided full name', () => {
    const hostElement: HTMLElement = fixture.debugElement.nativeElement;
    const fullName = 'Test User';
    component.fullName = fullName;

    fixture.detectChanges();

    expect(hostElement.textContent).toBe(fullName);
  });
});
