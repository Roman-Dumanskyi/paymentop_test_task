import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {IBook} from "../../shared";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {BookService} from "../../shared/services/book.service";
import {ModalService} from "../../shared/services/modal.service";
import {AsyncPipe} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatFabButton,
    MatIcon,
    MatTooltip,
    MatMiniFabButton,
    AsyncPipe,
    MatFormField,
    MatInput
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksListComponent implements OnInit {
  public readonly bookService: BookService = inject(BookService);
  public readonly modalService: ModalService = inject(ModalService);
  public readonly changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  displayedColumns: string[] = ['title', 'author', 'year', 'actions'];
  dataSource: IBook[] = [];

  ngOnInit(): void {
    this.bookService.getBooks().subscribe((res: IBook[]) => {
      this.dataSource = res;
    });

    this.bookService.getReload().subscribe(() => {
        this.refreshData();
    });
  }

  selectBook(book: IBook): void {
    this.modalService.bookDetailsDialog('view', book).afterClosed().subscribe((): void => {
        this.refreshData();
    });
  }

  editBook(book: IBook): void {
    event?.stopPropagation();

    this.modalService.bookDetailsDialog('edit', book).afterClosed().subscribe((): void => {
      this.refreshData();
    });
  }

  deleteBook(id: number) {
    event?.stopPropagation();

    this.bookService.deleteBook(id).subscribe(res => this.dataSource = res);
  }

  refreshData(): void {
    this.dataSource = this.bookService.favoriteBooks;
    this.changeDetector.markForCheck();
  }
}
