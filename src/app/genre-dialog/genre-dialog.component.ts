import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component to display genre information.
 * 
 * Receives genre data via Angular Material's dialog data injection.
 */
@Component({
  selector: 'app-genre-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.Name }}</h2>
    <mat-dialog-content>
      <p>{{ data.Description }}</p>
    </mat-dialog-content>
  `
})
export class GenreDialogComponent {
  /**
   * @param data Genre data injected from the parent component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
