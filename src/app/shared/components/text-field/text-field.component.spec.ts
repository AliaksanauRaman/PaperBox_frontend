import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextFieldComponent } from './text-field.component';

describe('TextFieldComponent', () => {
  let fixture: ComponentFixture<TextFieldComponent>;
  let component: TextFieldComponent;

  beforeEach(waitForAsync(() =>
    TestBed.configureTestingModule({
      imports: [TextFieldComponent],
    }).compileComponents()));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set unique id to label [for]', () => {
    component.uniqueId = '321';

    fixture.detectChanges();

    expect(getLabelDebugElement(fixture).attributes['for']).toBe('321');
  });

  it('should display label', () => {
    component.label = 'My label';

    fixture.detectChanges();

    expect(getLabelDebugElement(fixture).nativeElement.textContent).toBe(
      'My label'
    );
  });

  it('should set unique id to field [id]', () => {
    component.uniqueId = '123';

    fixture.detectChanges();

    expect(getFieldDebugElement(fixture).attributes['id']).toBe('123');
  });

  it('should set placeholder to field [placeholder]', () => {
    component.placeholder = 'My placeholder';

    fixture.detectChanges();

    expect(getFieldDebugElement(fixture).attributes['placeholder']).toBe(
      'My placeholder'
    );
  });

  it('should set max length to field [maxlength]', () => {
    component.maxLength = 100;

    fixture.detectChanges();

    expect(getFieldDebugElement(fixture).attributes['maxlength']).toBe('100');
  });

  it('should set initial value to field [value]', () => {
    component.writeValue('text');

    fixture.detectChanges();

    expect(getFieldDebugElement(fixture).nativeElement.value).toBe('text');
  });
});

function getLabelDebugElement(
  fixture: ComponentFixture<TextFieldComponent>
): DebugElement {
  return fixture.debugElement.query(By.css('.label'));
}

function getFieldDebugElement(
  fixture: ComponentFixture<TextFieldComponent>
): DebugElement {
  return fixture.debugElement.query(By.css('.field'));
}
