import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBooks } from './add-edit-books';

describe('AddEditBooks', () => {
  let component: AddEditBooks;
  let fixture: ComponentFixture<AddEditBooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBooks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditBooks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
