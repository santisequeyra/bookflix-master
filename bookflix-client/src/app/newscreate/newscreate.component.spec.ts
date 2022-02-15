import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscreateComponent } from './newscreate.component';

describe('NewscreateComponent', () => {
  let component: NewscreateComponent;
  let fixture: ComponentFixture<NewscreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
