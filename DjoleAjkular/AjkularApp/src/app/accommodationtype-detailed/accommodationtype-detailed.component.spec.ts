import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationtypeDetailedComponent } from './accommodationtype-detailed.component';

describe('AccommodationtypeDetailedComponent', () => {
  let component: AccommodationtypeDetailedComponent;
  let fixture: ComponentFixture<AccommodationtypeDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationtypeDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationtypeDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
