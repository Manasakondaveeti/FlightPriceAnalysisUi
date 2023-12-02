
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-erro-dialog',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './erro-dialog.component.html',
  styleUrl: './erro-dialog.component.css'
})
export class ErroDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
