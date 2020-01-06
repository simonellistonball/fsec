import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputLinesComponent } from './output-lines.component';

describe('OutputLinesComponent', () => {
  let component: OutputLinesComponent;
  let fixture: ComponentFixture<OutputLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
