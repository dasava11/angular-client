import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Purchase } from '../../models/purchases';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private PURCHASES_URL = environment.PURCHASES_URL;

  constructor(private http: HttpClient) { }

  getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.PURCHASES_URL}`).pipe(
      catchError(error => {
        console.error('Error fetching purchases', error);
        return throwError(() => new Error('Error fetching purchases'));
      })
    );
  }

  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.PURCHASES_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching purchase by ID', error);
        return throwError(() => new Error('Error fetching purchase by ID'));
      })
    );
  }

  createPurchase(data: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.PURCHASES_URL, data).pipe(
      catchError(error => {
        console.error('Error creating purchase', error);
        return throwError(() => new Error('Error creating purchase'));
      })
    );
  }

  editPurchase(id: number, data: Partial<Purchase>): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.PURCHASES_URL}/${id}`, data).pipe(
      catchError(error => {
        console.error('Error editing purchase', error);
        return throwError(() => new Error('Error editing purchase'));
      })
    );
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PURCHASES_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting purchase', error);
        return throwError(() => new Error('Error deleting purchase'));
      })
    );
  }
}
