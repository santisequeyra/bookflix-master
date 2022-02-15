import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishercreateComponent } from './publishercreate.component';

describe('PublishercreateComponent', () => {
  let component: PublishercreateComponent;
  let fixture: ComponentFixture<PublishercreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishercreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishercreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
