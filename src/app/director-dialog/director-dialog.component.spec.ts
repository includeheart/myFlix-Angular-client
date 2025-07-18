import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDialogComponent } from './director-dialog.component';

describe('DirectorDialogComponent', () => {
  let component: DirectorDialogComponent;
  let fixture: ComponentFixture<DirectorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
