import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAccommodationtypeComponent } from './add-accommodationtype.component';

describe('AddAccommodationtypeComponent', () => {
  let component: AddAccommodationtypeComponent;
  let fixture: ComponentFixture<AddAccommodationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccommodationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccommodationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
