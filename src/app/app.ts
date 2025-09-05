import { Component, signal, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddEditBooks } from './add-edit-books/add-edit-books';
import { Core } from './core/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Books } from './services/books';

@Component({
  selector: 'app-root',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('library_app');
  readonly dialog = inject(MatDialog);

  booksService: Books = inject(Books);
  coreService = inject(Core);

  openAddEditBookForm() {
    const dialogRef = this.dialog.open(AddEditBooks);
    // after the dialog is closed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // if val is true, refresh the book list
        if (val) {
          this.getAllBooks();
        }
      }
    });
  }


  displayedColumns: string[] = ['id', 'title', 'author', 'isbn', 'available', 'actions'];
  dataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  /*
  openEditBookForm(data: any) {
    // open same dialog as add book but with data
    const dialogRef = this.dialog.open(AddEditBooks, { data });
    // after the dialog is closed
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        // if val is true, refresh the book list
        if (val) {
          this.getAllBooks();
        }
      }
    });
  } */

  deleteBook(id: number) {
    this.booksService.deleteBook(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Book Deleted!', 'done');
        this.getAllBooks();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
