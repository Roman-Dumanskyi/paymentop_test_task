import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BookDetailsDialogComponent} from "../../components/book-details-dialog/book-details-dialog.component";
import {IBook} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public readonly dialog: MatDialog = inject(MatDialog);

  bookDetailsDialog(mode: string, book?: IBook): MatDialogRef<BookDetailsDialogComponent> {
    return this.dialog.open(BookDetailsDialogComponent, {
      width: '600px',
      data: { book, mode }
    });
  }
}
