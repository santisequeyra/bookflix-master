import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherdeleteComponent } from './publisherdelete.component';

describe('PublisherdeleteComponent', () => {
  let component: PublisherdeleteComponent;
  let fixture: ComponentFixture<PublisherdeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherdeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
