import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteComponent } from './incomplete.component';

describe('IncompleteComponent', () => {
  let component: IncompleteComponent;
  let fixture: ComponentFixture<IncompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
