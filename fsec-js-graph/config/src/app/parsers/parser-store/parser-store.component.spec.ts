import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserStoreComponent } from './parser-store.component';

describe('ParserStoreComponent', () => {
  let component: ParserStoreComponent;
  let fixture: ComponentFixture<ParserStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParserStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
