import {Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogClose, MatDialogRef} from "@angular/material/dialog";
import {IBook, IBookDialogData, IBookForm} from "../../shared";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {BookService} from "../../shared/services/book.service";
import {ModalService} from "../../shared/services/modal.service";

@Component({
  selector: 'app-book-details-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatDialogClose,
    MatIconButton,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatLabel
  ],
  templateUrl: './book-details-dialog.component.html',
  styleUrl: './book-details-dialog.component.scss'
})
export class BookDetailsDialogComponent implements OnInit {
  readonly data: IBookDialogData = inject<IBookDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<BookDetailsDialogComponent>);
  public readonly bookService: BookService = inject(BookService);
  public readonly modalService: ModalService = inject(ModalService);

  book: IBook = this.data.book;
  mode: string = this.data.mode;

  bookForm: FormGroup = new FormGroup<IBookForm>({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    author: new FormControl(null),
    year: new FormControl(null),
    publishingHouse: new FormControl(null),
    language: new FormControl(null),
    numberOfPages: new FormControl(null),
    description: new FormControl(null)
  });

  ngOnInit(): void {
    if(this.book) {
      this.bookForm.patchValue(this.book);
    }
  }

  changeMode(mode: string): void {
    if(this.mode === 'create') {
      this.dialogRef.close();
      return;
    }

    this.mode = mode;
    this.bookForm.patchValue(this.book);
  }

  saveBook(): void {
    if(this.bookForm.invalid) {
      return;
    }

    let book = this.bookForm.value;

    if(this.mode === 'edit') {
      this.bookService.editBook(book).subscribe((res: boolean): void => {
        if(res) {
          this.bookForm.setValue(book);
          this.book = book;
          this.mode = 'view';
        }
      });
    } else {
      book.id = this.bookService.generateRandomId();

      this.bookService.createBook(book).subscribe((res: boolean): void => {
        if(res) {
          this.dialogRef.close();
        }
      });
    }
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe((res: IBook[]): void => {
      if (res) {
        this.dialogRef.close();
      }
    });
  }
}
