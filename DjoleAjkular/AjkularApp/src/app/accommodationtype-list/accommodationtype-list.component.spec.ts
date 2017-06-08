import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationtypeListComponent } from './accommodationtype-list.component';

describe('AccommodationtypeListComponent', () => {
  let component: AccommodationtypeListComponent;
  let fixture: ComponentFixture<AccommodationtypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccommodationtypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccommodationtypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
