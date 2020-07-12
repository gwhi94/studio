import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor( private snackBar:MatSnackBar) { }

//not showing snackbar
  showError(message){
    console.log(message);
    this.snackBar.open(message, undefined, {
      duration: 5000,
      panelClass: ['error', 'app-alert'],
      verticalPosition: 'top'
    });
  }

  showSuccess(message){
    this.snackBar.open(message, undefined, {
      duration:5000,
      panelClass:['success', 'app-alert'],
      verticalPosition:'top'
    })
  }
}
