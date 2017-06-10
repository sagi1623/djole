import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailedComponent } from './room-detailed.component';

describe('RoomDetailedComponent', () => {
  let component: RoomDetailedComponent;
  let fixture: ComponentFixture<RoomDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
