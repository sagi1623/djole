import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccommodationtypeComponent } from './edit-accommodationtype.component';

describe('EditAccommodationtypeComponent', () => {
  let component: EditAccommodationtypeComponent;
  let fixture: ComponentFixture<EditAccommodationtypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAccommodationtypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAccommodationtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
