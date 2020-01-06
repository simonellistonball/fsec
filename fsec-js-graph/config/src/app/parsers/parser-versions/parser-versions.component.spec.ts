import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserVersionsComponent } from './parser-versions.component';

describe('ParserVersionsComponent', () => {
  let component: ParserVersionsComponent;
  let fixture: ComponentFixture<ParserVersionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserVersionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserVersionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
