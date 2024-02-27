import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-details-dialog',
  templateUrl: './employee-details-dialog.component.html',
  styleUrls: ['./employee-details-dialog.component.css']
})
export class EmployeeDetailsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeDetailsDialogComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
