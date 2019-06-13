import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantFilterComponent } from './tenant-filter.component';

describe('TenantFilterComponent', () => {
  let component: TenantFilterComponent;
  let fixture: ComponentFixture<TenantFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenantFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
