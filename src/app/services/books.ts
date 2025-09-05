import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Books {
  targetUrl: string = 'http://localhost:8080/api/books';

  constructor(private _http: HttpClient) { }

  addBook(data: any): Observable<any> {
    console.log(data);
    return this._http.post(`${this.targetUrl}/addBook`, data);
  }

  getAllBooks(): Observable<any> {
    return this._http.get(this.targetUrl);
  }

  deleteBook(id: number): Observable<any> {
    return this._http.delete(`${this.targetUrl}/${id}`);
  }

  /*
  updateBook(id: number, data: any): Observable<any> {
    return this._http.put(`${this.targetUrl}/${id}`, data);
  }
    */
}
