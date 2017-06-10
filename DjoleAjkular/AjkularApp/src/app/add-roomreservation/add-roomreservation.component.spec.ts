import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRoomreservationComponent } from './add-roomreservation.component';

describe('AddRoomreservationComponent', () => {
  let component: AddRoomreservationComponent;
  let fixture: ComponentFixture<AddRoomreservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRoomreservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRoomreservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
