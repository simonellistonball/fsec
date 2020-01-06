import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerStepComponent } from './normalizer-step.component';

describe('NormalizerStepComponent', () => {
  let component: NormalizerStepComponent;
  let fixture: ComponentFixture<NormalizerStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
