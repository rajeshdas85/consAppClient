import { Injectable } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSnackBarConfig } from "@angular/material/snack-bar";
declare var $: any;

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private snackBar: MatSnackBar) { }

  /*show(message: string, type: number) {

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
  }*/

  showNotification(from, align, message, colorCode) {
    if(from==""){
    from = 'top';
    }
  if(align==""){
    align = 'right';
  }
    //any time i can make dynamic for  any position as below
    // ('bottom','right')
    // ('bottom','center')
    // ('bottom','left')
    // ('top','right')
    // ('top','center')
    // ('top','left')

    //  const type = ['','info','success','warning','danger'];

    const type = ['success', 'danger', 'warning', 'info'];

    const color = colorCode;

    $.notify({
      icon: "notifications",
      message: message//"Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: type[color],
        timer: 4000,
        placement: {
          from: from,
          align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
      });
  }

}
