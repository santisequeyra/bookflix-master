import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedaccountsComponent } from './createdaccounts.component';

describe('CreatedaccountsComponent', () => {
  let component: CreatedaccountsComponent;
  let fixture: ComponentFixture<CreatedaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
