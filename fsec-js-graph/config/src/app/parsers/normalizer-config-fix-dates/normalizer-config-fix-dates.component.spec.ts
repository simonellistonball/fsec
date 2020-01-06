import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerConfigFixDatesComponent } from './normalizer-config-fix-dates.component';

describe('NormalizerConfigFixDatesComponent', () => {
  let component: NormalizerConfigFixDatesComponent;
  let fixture: ComponentFixture<NormalizerConfigFixDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerConfigFixDatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerConfigFixDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
