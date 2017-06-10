import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailedComponent } from './accommodation-detailed.component';

describe('AccommodationDetailedComponent', () => {
  let component: AccommodationDetailedComponent;
  let fixture: ComponentFixture<AccommodationDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
