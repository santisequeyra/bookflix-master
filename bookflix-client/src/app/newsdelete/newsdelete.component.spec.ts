import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsdeleteComponent } from './newsdelete.component';

describe('NewsdeleteComponent', () => {
  let component: NewsdeleteComponent;
  let fixture: ComponentFixture<NewsdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
