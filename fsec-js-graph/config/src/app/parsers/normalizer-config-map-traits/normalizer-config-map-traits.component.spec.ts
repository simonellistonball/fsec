import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerConfigMapTraitsComponent } from './normalizer-config-map-traits.component';

describe('NormalizerConfigMapTraitsComponent', () => {
  let component: NormalizerConfigMapTraitsComponent;
  let fixture: ComponentFixture<NormalizerConfigMapTraitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerConfigMapTraitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerConfigMapTraitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
