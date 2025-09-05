import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-edit-books',
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule,
    MatIconModule, MatSelectModule],
  templateUrl: './add-edit-books.html',
  styleUrl: './add-edit-books.css'
})
export class AddEditBooks {

}
