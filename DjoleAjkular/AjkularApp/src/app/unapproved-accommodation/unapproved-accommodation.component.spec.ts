import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedAccommodationComponent } from './unapproved-accommodation.component';

describe('UnapprovedAccommodationComponent', () => {
  let component: UnapprovedAccommodationComponent;
  let fixture: ComponentFixture<UnapprovedAccommodationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapprovedAccommodationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapprovedAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
