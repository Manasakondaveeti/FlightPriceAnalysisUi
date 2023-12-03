import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-dialog-component',
  standalone: true,
  imports: [CommonModule,MatTableModule],
  templateUrl: './data-dialog-component.component.html',
  styleUrl: './data-dialog-component.component.css'
})
export class DataDialogComponentComponent {
  displayedColumns: string[] = ['website', 'price'];
  dataSource = new MatTableDataSource([]);
cache:any;


 constructor(
    public dialogRef: MatDialogRef<DataDialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
 ) {
    this.dataSource.data = data.data;
    this.cache=data.cache;
    
    
 }

 onNoClick(): void {
    this.dialogRef.close();
 }
 
}
