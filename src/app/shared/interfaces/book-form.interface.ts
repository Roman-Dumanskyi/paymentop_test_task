import {FormControl} from "@angular/forms";

export interface IBookForm {
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  author: FormControl<string | null>;
  year: FormControl<string | null>;
  publishingHouse: FormControl<string | null>;
  language: FormControl<string | null>;
  numberOfPages: FormControl<string | null>;
  description: FormControl<string | null>;
}
