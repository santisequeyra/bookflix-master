import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerdetailComponent } from './trailerdetail.component';

describe('TrailerdetailComponent', () => {
  let component: TrailerdetailComponent;
  let fixture: ComponentFixture<TrailerdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
