import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerConfigRenameComponent } from './normalizer-config-rename.component';

describe('NormalizerConfigRenameComponent', () => {
  let component: NormalizerConfigRenameComponent;
  let fixture: ComponentFixture<NormalizerConfigRenameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerConfigRenameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerConfigRenameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
