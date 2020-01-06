import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserListComponent } from './parser-list.component';

describe('ParserListComponent', () => {
  let component: ParserListComponent;
  let fixture: ComponentFixture<ParserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
