import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomreservationComponent } from './roomreservation.component';

describe('RoomreservationComponent', () => {
  let component: RoomreservationComponent;
  let fixture: ComponentFixture<RoomreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
