import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Books } from '../services/books';
import { Core } from '../core/core';

@Component({
  selector: 'app-add-edit-books',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatSelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-books.html',
  styleUrl: './add-edit-books.css'
})
export class AddEditBooks {
  coreService = inject(Core);

  // book form
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    isbn: new FormControl(''),
    status: new FormControl(''),
  });

  booksService: Books = inject(Books);

  // on submitting form
  onBookFormSubmit() {
    // if form is valid
    if (this.bookForm.valid) {
      // call addBook function in book service
      this.booksService.addBook(this.bookForm.value).subscribe({
        // subscribe to observable and listen to response
        next: (res) => {
          // no error
          // alert('Book Added')
          console.log(res);
          this.coreService.openSnackBar('Book Added Successfully');
        },
        error: (err) => {
          // error
          console.error(err);
        }
      });
    }
  }

}
