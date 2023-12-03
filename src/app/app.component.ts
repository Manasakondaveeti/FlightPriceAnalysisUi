import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { DataDialogComponentComponent } from './data-dialog-component/data-dialog-component.component';
import { ErroDialogComponent } from './erro-dialog/erro-dialog.component';





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
  error:any;
  apiResultSource: string = ''; // Variable to store the API result for source
  apiResultDestination: string = ''; // Variable to store the API result for destination

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
      }),
      catchError(errResp=>
       {this.error=errResp.error;
         console.log(this.error);
         this.openErrorDialog(this.error);
         return this.error;
       }
     ),
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
     }),
     catchError(errResp=>
      {this.error=errResp.error;
        console.log(this.error);
        this.openErrorDialog(this.error);
        return this.error;
      }
    ),
    ).subscribe();
  }
  

  openErrorDialog(message: string): void {
    const dialogRef = this.dialog.open(ErroDialogComponent, {
      width: '250px',
      data: { message: message }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The error dialog was closed');
    });
  }

  openDialog(): void {

    this.dialog.open(DataDialogComponentComponent, {
      width: '50%',
      height: '50%',
      data: { data: this.data }
    });
    
  }


  onInputChange() {
    const sourceInput = this.flightDetailsEntered.source.trim();
    const destinationInput = this.flightDetailsEntered.destination.trim();
   
    // Handle logic when input values change
    console.log('Input values changed:', this.flightDetailsEntered.source.trim());
    if (this.flightDetailsEntered.source.trim() !== '') {
      const apiUrsource = 'http://localhost:8080/api/wordCompletion/' + this.flightDetailsEntered.source.trim();
      console.log('API URL:', apiUrsource);
      this.http.get(apiUrsource).pipe(
          map(data => {
              console.log('data: ', data);
              this.apiResultSource = data as string;
              return data;
          })
      ).subscribe();
    }else{
      this.apiResultSource = "";
    }
    if (this.flightDetailsEntered.destination.trim() !== '') {
      const apiUrlDestination = 'http://localhost:8080/api/wordCompletion/' + this.flightDetailsEntered.destination.trim();
      console.log('API URL:', apiUrlDestination);
      this.http.get(apiUrlDestination).pipe(
          map(data => {
              console.log('data: ', data);
              this.apiResultDestination = data as string;
              return data;
          })
      ).subscribe();
    }else{
      this.apiResultDestination = "";
    }
   
}
}


