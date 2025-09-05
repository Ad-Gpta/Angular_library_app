import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('library_app');
  readonly dialog = inject(MatDialog);

  booksService: Books = inject(Books);
  coreService = inject(Core);

  openAddEditBookForm() {
    this.dialog.open(AddEditBooks);
  }

  displayedColumns: string[] = ['id', 'title', 'author', 'isbn', 'done'];
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
}
