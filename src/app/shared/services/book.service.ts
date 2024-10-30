import { Injectable } from '@angular/core';
import {Observable, of, Subject} from "rxjs";
import {IBook} from "../interfaces";
import data from '../../data.json';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private reloadList$ = new Subject();
  favoriteBooks: IBook[] = data;

  setReload() {
    this.reloadList$.next(true);
  }

  getReload(): Observable<any> {
    return this.reloadList$.asObservable();
  }

  getBooks(): Observable<IBook[]> {
    return of(this.favoriteBooks);
  }

  editBook(book: IBook): Observable<boolean> {
    const id: number = book.id;

    this.favoriteBooks = this.favoriteBooks
      .map((b: IBook): IBook => {
        b = b.id === id ? book : b;

        return b;
    });

    return of(true);
  }

  createBook(book: IBook): Observable<boolean> {
    this.favoriteBooks = [book, ...this.favoriteBooks];

    return of(true);
  }

  deleteBook(id: number): Observable<IBook[]> {
    this.favoriteBooks = this.favoriteBooks.filter((book: IBook): boolean => id !== book.id)

    return of(this.favoriteBooks);
  }

  generateRandomId(): string {
    const charset: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result: string = '';
    for (let i: number = 0; i < 5; i++) {
      const randomIndex: number = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }
}
