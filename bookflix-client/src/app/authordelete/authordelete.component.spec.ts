import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthordeleteComponent } from './authordelete.component';

describe('AuthordeleteComponent', () => {
  let component: AuthordeleteComponent;
  let fixture: ComponentFixture<AuthordeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthordeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthordeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
