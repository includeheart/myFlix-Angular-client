import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-director-dialog',
  template: `
    <h2 mat-dialog-title>{{ data.Name }}</h2>
    <mat-dialog-content>
      <p>{{ data.Description }}</p>
    </mat-dialog-content>
  `
})
export class DirectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
