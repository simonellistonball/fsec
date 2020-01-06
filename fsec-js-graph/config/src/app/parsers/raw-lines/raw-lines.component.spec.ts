import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawLinesComponent } from './raw-lines.component';

describe('RawLinesComponent', () => {
  let component: RawLinesComponent;
  let fixture: ComponentFixture<RawLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
