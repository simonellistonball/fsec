import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserConfigGrokComponent } from './parser-config-grok.component';

describe('ParserConfigGrokComponent', () => {
  let component: ParserConfigGrokComponent;
  let fixture: ComponentFixture<ParserConfigGrokComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserConfigGrokComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserConfigGrokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
