import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadcoverComponent } from './uploadcover.component';

describe('UploadcoverComponent', () => {
  let component: UploadcoverComponent;
  let fixture: ComponentFixture<UploadcoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadcoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadcoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
