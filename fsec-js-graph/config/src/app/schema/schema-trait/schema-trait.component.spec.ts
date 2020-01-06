import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTraitComponent } from './schema-trait.component';

describe('SchemaTraitComponent', () => {
  let component: SchemaTraitComponent;
  let fixture: ComponentFixture<SchemaTraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
