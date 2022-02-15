import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadtrailerComponent } from './uploadtrailer.component';

describe('UploadtrailerComponent', () => {
  let component: UploadtrailerComponent;
  let fixture: ComponentFixture<UploadtrailerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadtrailerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadtrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
