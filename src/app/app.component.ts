import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponentComponent } from './data-dialog-component/data-dialog-component.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule ,HttpClientModule,RouterOutlet,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
  
})


export class AppComponent {
  title = 'FlightPriceAnalysisUi';
  data:any;

  flightDetailsEntered=
  {
    source :'',
    destination:'',
    noofpersons: 0,
    date: Date,
    classtype:''

  }
 

  constructor(private http: HttpClient, public dialog: MatDialog) 
 
{ }
  wordcheck()
  {
    const wordcheckval2 = this.flightDetailsEntered.source;
 
    this.http.get('http://localhost:8080/api/wordcheck/'+wordcheckval2).pipe(
      map(data => {
         console.log('data: ', data);
         alert("did you mean "+data);
         return data;
      })
     ).subscribe();
  }

  onSubmit(form: any) {
    console.log('Login Form:', form);
    // Call your API to authenticate the user
    // For example:
    this.http.post('http://localhost:8080/api/submissionform/submit', this.flightDetailsEntered).pipe(
      map(data => {
        this.data=data;
        console.log(data);
        this.openDialog();
       // return data;
     })
    ).subscribe();
  }


  openDialog(): void {

    this.dialog.open(DataDialogComponentComponent, {
      width: '50%',
      height: '50%',
      data: { data: this.data }
    });
    
  }
}


