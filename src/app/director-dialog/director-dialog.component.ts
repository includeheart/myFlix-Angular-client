import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component to display director information.
 * 
 * Receives director data via Angular Material's dialog data injection.
 */
@Component({
  selector: 'app-director-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.Name }}</h2>
    <mat-dialog-content>
      <p>{{ data.Bio }}</p>
    </mat-dialog-content>
  `
})
export class DirectorDialogComponent {
  /**
   * @param data Director data injected from the parent component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
