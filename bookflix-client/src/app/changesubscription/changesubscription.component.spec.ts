import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangesubscriptionComponent } from './changesubscription.component';

describe('ChangesubscriptionComponent', () => {
  let component: ChangesubscriptionComponent;
  let fixture: ComponentFixture<ChangesubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangesubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangesubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
