import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailercreateComponent } from './trailercreate.component';

describe('TrailercreateComponent', () => {
  let component: TrailercreateComponent;
  let fixture: ComponentFixture<TrailercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
