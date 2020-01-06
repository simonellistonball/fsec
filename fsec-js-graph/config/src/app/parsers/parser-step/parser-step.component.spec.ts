import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserStepComponent } from './parser-step.component';

describe('ParserStepComponent', () => {
  let component: ParserStepComponent;
  let fixture: ComponentFixture<ParserStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
