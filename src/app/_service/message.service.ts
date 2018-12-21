import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSnackBarConfig } from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private snackBar: MatSnackBar) { }
  
  show(message: string, type: number) {
    
    const config = new MatSnackBarConfig();
    switch (type) {
      case 0:
        config.panelClass = ['alert-success'];
        break;
      case 1:
        config.panelClass = ['alert-danger'];
        break;
      case 2:
        config.panelClass = ['alert-warning'];
        break;
      case 3:
        config.panelClass = ['alert-info'];
        break;
      default:
        config.panelClass = ['background-info'];
        break;
    }

    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this.snackBar.open(message, null, config);
  }
 

}
