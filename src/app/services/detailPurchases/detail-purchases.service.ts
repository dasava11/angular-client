import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { DetailPurchase } from '../../models/detailPurchases';

@Injectable({
  providedIn: 'root'
})
export class DetailPurchasesService {

  private DETAIL_PURCHASES_URL = environment.DETAIL_PURCHASES_URL;

  constructor(private http: HttpClient) { }

  getAllDetails(): Observable<DetailPurchase[]> {
    return this.http.get<DetailPurchase[]>(this.DETAIL_PURCHASES_URL).pipe(
      catchError(error => {
        console.error('Error fetching detail purchases', error);
        return throwError(() => new Error('Error fetching detail purchases'));
      })
    );
  }

  getDetailById(id: number): Observable<DetailPurchase> {
    return this.http.get<DetailPurchase>(`${this.DETAIL_PURCHASES_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching detail purchase by ID', error);
        return throwError(() => new Error('Error fetching detail purchase by ID'));
      })
    );
  }

  getDetailsByPurchaseId(id_purchases: number): Observable<DetailPurchase[]> {
    return this.http.get<DetailPurchase[]>(`${this.DETAIL_PURCHASES_URL}?id_purchases=${id_purchases}`).pipe(
      catchError(error => {
        console.error('Error fetching details by purchase ID', error);
        return throwError(() => new Error('Error fetching details by purchase ID'));
      })
    );
  }

  createDetail(data: DetailPurchase): Observable<DetailPurchase> {
    return this.http.post<DetailPurchase>(this.DETAIL_PURCHASES_URL, data).pipe(
      catchError(error => {
        console.error('Error creating detail purchase', error);
        return throwError(() => new Error('Error creating detail purchase'));
      })
    );
  }

  editDetail(id: number, data: Partial<DetailPurchase>): Observable<DetailPurchase> {
    return this.http.put<DetailPurchase>(`${this.DETAIL_PURCHASES_URL}/${id}`, data).pipe(
      catchError(error => {
        console.error('Error editing detail purchase', error);
        return throwError(() => new Error('Error editing detail purchase'));
      })
    );
  }

  deleteDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.DETAIL_PURCHASES_URL}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting detail purchase', error);
        return throwError(() => new Error('Error deleting detail purchase'));
      })
    );
  }
}
