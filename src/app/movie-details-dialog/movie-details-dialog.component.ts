import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Dialog component to display movie details.
 * 
 * Receives movie data via Angular Material's dialog data injection.
 */
@Component({
  selector: 'app-movie-details-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.Title }}</h2>
    <mat-dialog-content>
      <p>{{ data.Description }}</p>
    </mat-dialog-content>
  `
})
export class MovieDetailsDialogComponent {
  /**
   * @param data Movie data injected from the parent component.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}