import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerConfigNoopComponent } from './normalizer-config-noop.component';

describe('NormalizerConfigNoopComponent', () => {
  let component: NormalizerConfigNoopComponent;
  let fixture: ComponentFixture<NormalizerConfigNoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerConfigNoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerConfigNoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
