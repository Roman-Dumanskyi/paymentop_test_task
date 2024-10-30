import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BooksListComponent} from "./components/books-list/books-list.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {BookService} from "./shared/services/book.service";
import {ModalService} from "./shared/services/modal.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BooksListComponent, MatIcon, MatButton, MatTooltip, MatFabButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public readonly bookService: BookService = inject(BookService);
  public readonly modalService: ModalService = inject(ModalService);

  addBook() {
    this.modalService.bookDetailsDialog('create').afterClosed().subscribe((): void => {
      this.bookService.setReload();
    });
  }
}
