import { Component, DebugElement, ElementRef } from '@angular/core';
import { ScaleDirective } from './scale.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <div appScale>Test Element</div> `,
})
class TestComponent {}

describe('ScaleDirective', () => {
  let element: DebugElement;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let elementRef: ElementRef<HTMLElement>;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ScaleDirective));
    elementRef = new ElementRef(
      fixture.nativeElement.querySelector('div[appScale]')
    );

    fixture.detectChanges();
  });
  it('should create an instance', () => {
    const directive = new ScaleDirective(element);
    expect(directive).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply scale when mouse enters the element', () => {
    const directive = new ScaleDirective(elementRef);

    directive.onMouseEnter();

    expect(elementRef.nativeElement.style.transition).toBe('all 0.2s ease 0s');
    expect(elementRef.nativeElement.style.transform).toBe('scale(1.1)');
  });

  it('should reset scale when mouse leaves the element', () => {
    const directive = new ScaleDirective(elementRef);

    directive.onMouseLeave();

    expect(elementRef.nativeElement.style.transition).toBe('all 0.2s ease 0s');
    expect(elementRef.nativeElement.style.transform).toBe('scale(1)');
  });

  it('should apply scale on mouseenter and reset on mouseleave', () => {
    const directive = new ScaleDirective(elementRef);

    directive.onMouseEnter();
    expect(elementRef.nativeElement.style.transition).toBe('all 0.2s ease 0s');
    expect(elementRef.nativeElement.style.transform).toBe('scale(1.1)');

    directive.onMouseLeave();
    expect(elementRef.nativeElement.style.transition).toBe('all 0.2s ease 0s');
    expect(elementRef.nativeElement.style.transform).toBe('scale(1)');
  });
});
