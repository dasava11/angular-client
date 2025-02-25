import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailPurchasesService {

  private DETAIL_PURCHASES_URL = environment.DETAIL_PURCHASES_URL;

  constructor(private http: HttpClient) { }

  getAllDetails(): Observable<any> {
    return this.http.get(`${this.DETAIL_PURCHASES_URL}`);
  }

  getDetailById(id: string): Observable<any> {
    return this.http.get(`${this.DETAIL_PURCHASES_URL}/${id}`);
  }

  getDetailsByPurchaseId(id_purchases: number): Observable<any> {
    return this.http.get(`${this.DETAIL_PURCHASES_URL}?id_purchases=${id_purchases}`);
  }

  createDetail(data: any): Observable<any> {
    return this.http.post(this.DETAIL_PURCHASES_URL, data);
  }

  editDetail(id: string, data: any): Observable<any> {
    return this.http.put(`${this.DETAIL_PURCHASES_URL}/${id}`, data);
  }

  deleteDetail(id: string): Observable<any> {
    return this.http.delete(`${this.DETAIL_PURCHASES_URL}/${id}`);
  }
}