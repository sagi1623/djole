import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomreservationComponent } from './edit-roomreservation.component';

describe('EditRoomreservationComponent', () => {
  let component: EditRoomreservationComponent;
  let fixture: ComponentFixture<EditRoomreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
