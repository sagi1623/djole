import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationtypeComponent } from './accommodationtype.component';

describe('AccommodationtypeComponent', () => {
  let component: AccommodationtypeComponent;
  let fixture: ComponentFixture<AccommodationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
