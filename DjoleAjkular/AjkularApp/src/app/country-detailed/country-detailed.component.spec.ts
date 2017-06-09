import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDetailedComponent } from './country-detailed.component';

describe('CountryDetailedComponent', () => {
  let component: CountryDetailedComponent;
  let fixture: ComponentFixture<CountryDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
