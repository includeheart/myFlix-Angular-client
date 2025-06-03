import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsDialogComponent } from './movie-details-dialog.component';

describe('MovieDetailsDialogComponent', () => {
  let component: MovieDetailsDialogComponent;
  let fixture: ComponentFixture<MovieDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
