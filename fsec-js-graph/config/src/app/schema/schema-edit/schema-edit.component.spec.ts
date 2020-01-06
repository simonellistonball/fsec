import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaEditComponent } from './schema-edit.component';

describe('SchemaEditComponent', () => {
  let component: SchemaEditComponent;
  let fixture: ComponentFixture<SchemaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
