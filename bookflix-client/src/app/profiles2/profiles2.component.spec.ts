import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {Profiles2Component} from './profiles2.component';

describe('Profiles2Component', () => {
  let component: Profiles2Component;
  let fixture: ComponentFixture<Profiles2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Profiles2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Profiles2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
