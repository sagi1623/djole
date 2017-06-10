import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomreservationDetailedComponent } from './roomreservation-detailed.component';

describe('RoomreservationDetailedComponent', () => {
  let component: RoomreservationDetailedComponent;
  let fixture: ComponentFixture<RoomreservationDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomreservationDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomreservationDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
