import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookdetailadminComponent } from './bookdetailadmin.component';

describe('BookdetailadminComponent', () => {
  let component: BookdetailadminComponent;
  let fixture: ComponentFixture<BookdetailadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookdetailadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookdetailadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
