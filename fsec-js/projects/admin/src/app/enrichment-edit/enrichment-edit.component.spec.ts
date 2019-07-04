import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrichmentEditComponent } from './enrichment-edit.component';

describe('EnrichmentEditComponent', () => {
  let component: EnrichmentEditComponent;
  let fixture: ComponentFixture<EnrichmentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrichmentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrichmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
