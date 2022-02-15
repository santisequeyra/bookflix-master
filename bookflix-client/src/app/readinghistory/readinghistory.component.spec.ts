import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadinghistoryComponent } from './readinghistory.component';

describe('ReadinghistoryComponent', () => {
  let component: ReadinghistoryComponent;
  let fixture: ComponentFixture<ReadinghistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadinghistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadinghistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
