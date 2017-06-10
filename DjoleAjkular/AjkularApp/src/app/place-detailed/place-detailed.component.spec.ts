import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceDetailedComponent } from './place-detailed.component';

describe('PlaceDetailedComponent', () => {
  let component: PlaceDetailedComponent;
  let fixture: ComponentFixture<PlaceDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
