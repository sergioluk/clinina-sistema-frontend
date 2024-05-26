import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBarSucces(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: ['snackbar-estilo'] //Fazer um css customizado
    })
  }
}
