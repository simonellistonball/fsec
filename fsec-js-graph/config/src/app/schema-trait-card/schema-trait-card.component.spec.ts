import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTraitCardComponent } from './schema-trait-card.component';

describe('SchemaTraitCardComponent', () => {
  let component: SchemaTraitCardComponent;
  let fixture: ComponentFixture<SchemaTraitCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTraitCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTraitCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
