import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserTesterComponent } from './parser-tester.component';

describe('ParserTesterComponent', () => {
  let component: ParserTesterComponent;
  let fixture: ComponentFixture<ParserTesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserTesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserTesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
