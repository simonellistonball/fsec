import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserConfigNoopComponent } from './parser-config-noop.component';

describe('ParserConfigNoopComponent', () => {
  let component: ParserConfigNoopComponent;
  let fixture: ComponentFixture<ParserConfigNoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserConfigNoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserConfigNoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
