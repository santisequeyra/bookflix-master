import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerlistComponent } from './trailerlist.component';

describe('TrailerlistComponent', () => {
  let component: TrailerlistComponent;
  let fixture: ComponentFixture<TrailerlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
