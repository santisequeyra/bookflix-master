import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbooksComponent } from './topbooks.component';

describe('TopbooksComponent', () => {
  let component: TopbooksComponent;
  let fixture: ComponentFixture<TopbooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopbooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
