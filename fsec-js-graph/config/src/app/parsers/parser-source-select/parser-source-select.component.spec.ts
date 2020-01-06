import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserSourceSelectComponent } from './parser-source-select.component';

describe('ParserSourceSelectComponent', () => {
  let component: ParserSourceSelectComponent;
  let fixture: ComponentFixture<ParserSourceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserSourceSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserSourceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
