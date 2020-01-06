import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormalizerConfigScriptComponent } from './normalizer-config-script.component';

describe('NormalizerConfigScriptComponent', () => {
  let component: NormalizerConfigScriptComponent;
  let fixture: ComponentFixture<NormalizerConfigScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormalizerConfigScriptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormalizerConfigScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
