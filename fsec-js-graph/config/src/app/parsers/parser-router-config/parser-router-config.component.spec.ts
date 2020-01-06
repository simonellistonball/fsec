import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserRouterConfigComponent } from './parser-router-config.component';

describe('ParserRouterConfigComponent', () => {
  let component: ParserRouterConfigComponent;
  let fixture: ComponentFixture<ParserRouterConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserRouterConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserRouterConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
