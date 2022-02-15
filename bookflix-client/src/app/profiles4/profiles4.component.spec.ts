import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Profiles4Component} from './profiles4.component';

describe('Profiles4Component', () => {
  let component: Profiles4Component;
  let fixture: ComponentFixture<Profiles4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Profiles4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Profiles4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
