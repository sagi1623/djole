import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDetailedComponent } from './region-detailed.component';

describe('RegionDetailedComponent', () => {
  let component: RegionDetailedComponent;
  let fixture: ComponentFixture<RegionDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
