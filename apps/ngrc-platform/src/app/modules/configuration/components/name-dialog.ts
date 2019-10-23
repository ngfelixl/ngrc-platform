import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  template: `
    <mat-form-field>
      <input matInput placeholder="Name" [(ngModel)]="title" autocomplete="off">
    </mat-form-field>

    <button mat-button color="primary" (click)="dialogRef.close(title)">Save</button>
    <button mat-button (click)="dialogRef.close()">Cancel</button>
  `
})
export class NameDialogComponent {
  public title = '';

  constructor(
    public dialogRef: MatDialogRef<NameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
