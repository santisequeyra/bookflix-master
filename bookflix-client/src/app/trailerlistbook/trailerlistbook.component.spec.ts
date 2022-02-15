import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerlistbookComponent } from './trailerlistbook.component';

describe('TrailerlistbookComponent', () => {
  let component: TrailerlistbookComponent;
  let fixture: ComponentFixture<TrailerlistbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerlistbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerlistbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
