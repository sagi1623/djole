import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomreservationListComponent } from './roomreservation-list.component';

describe('RoomreservationListComponent', () => {
  let component: RoomreservationListComponent;
  let fixture: ComponentFixture<RoomreservationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomreservationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomreservationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
