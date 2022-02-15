import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewdetailComponent } from './newdetail.component';

describe('NewdetailComponent', () => {
  let component: NewdetailComponent;
  let fixture: ComponentFixture<NewdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
