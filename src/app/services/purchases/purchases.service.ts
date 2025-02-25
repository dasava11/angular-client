import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private PURCHASES_URL = environment.PURCHASES_URL;

  constructor(private http: HttpClient) { }

  getAllPurchases(): Observable<any> {
    return this.http.get(`${this.PURCHASES_URL}`);
  }

  getPurchaseById(id: number): Observable<any> {
    return this.http.get(`${this.PURCHASES_URL}/${id}`);
  }

  createPurchase(data: any): Observable<any> {
    return this.http.post(this.PURCHASES_URL, data);
  }

  editPurchase(id: number, data: any): Observable<any> {
    return this.http.put(`${this.PURCHASES_URL}/${id}`, data);
  }

  deletePurchase(id: number): Observable<any> {
    return this.http.delete(`${this.PURCHASES_URL}/${id}`);
  }
}

