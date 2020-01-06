import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraitEnrichmentsComponent } from './trait-enrichments.component';

describe('TraitEnrichmentsComponent', () => {
  let component: TraitEnrichmentsComponent;
  let fixture: ComponentFixture<TraitEnrichmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraitEnrichmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraitEnrichmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
