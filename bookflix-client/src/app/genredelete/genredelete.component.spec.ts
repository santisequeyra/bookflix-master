import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenredeleteComponent } from './genredelete.component';

describe('GenredeleteComponent', () => {
  let component: GenredeleteComponent;
  let fixture: ComponentFixture<GenredeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenredeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenredeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
