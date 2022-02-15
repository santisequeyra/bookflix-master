import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsmodifyComponent } from './newsmodify.component';

describe('NewsmodifyComponent', () => {
  let component: NewsmodifyComponent;
  let fixture: ComponentFixture<NewsmodifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsmodifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsmodifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
