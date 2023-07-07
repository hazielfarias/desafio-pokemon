import { Component, DebugElement } from '@angular/core';
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

  beforeEach(() => {
    TestBed.configureTestingModule({});

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.directive(ScaleDirective));

    fixture.detectChanges();
  });
  it('should create an instance', () => {
    const directive = new ScaleDirective(element);
    expect(directive).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
