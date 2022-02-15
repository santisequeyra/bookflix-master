import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodifyComponent } from './bookmodify.component';

describe('BookmodifyComponent', () => {
  let component: BookmodifyComponent;
  let fixture: ComponentFixture<BookmodifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmodifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
