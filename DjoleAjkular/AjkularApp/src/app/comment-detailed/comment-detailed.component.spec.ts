import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentDetailedComponent } from './comment-detailed.component';

describe('CommentDetailedComponent', () => {
  let component: CommentDetailedComponent;
  let fixture: ComponentFixture<CommentDetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentDetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
