import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
  booksService: Books = inject(Books);

  // book form
  /*
  bookForm = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    isbn: new FormControl(''),
    available: new FormControl(''),
  });
  */

  bookForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditBooks>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.bookForm = this._fb.group({
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      available: new FormControl('')
    });

  };

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
  }

  // on submitting form
  onBookFormSubmit() {
    // update book
    /*
   if (this.data) {
     this.booksService.updateBook(this.data.id, this.bookForm.value).subscribe({
       next: (res) => {
         alert('book Updated')
         this._dialogRef.close(true);
         console.log(res);
       },
       error: (err) => {
         console.error(err);
       }
     });
     } else {
     */

    // Add book
    this.booksService.addBook(this.bookForm.value).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Book added!', 'done');
        this._dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  // }
}

