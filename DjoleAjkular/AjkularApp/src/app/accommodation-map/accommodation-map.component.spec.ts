import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationMapComponent } from './accommodation-map.component';

describe('AccommodationMapComponent', () => {
  let component: AccommodationMapComponent;
  let fixture: ComponentFixture<AccommodationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
