import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailShoppingService {

  private DETAIL_SHOPPING_URL = environment.DETAIL_SHOPPING_URL;

  constructor(private http: HttpClient) { }

  getAllDetails(): Observable<any> {
    return this.http.get(`${this.DETAIL_SHOPPING_URL}`);
  }

  getDetailById(id: string): Observable<any> {
    return this.http.get(`${this.DETAIL_SHOPPING_URL}/${id}`);
  }

  getDetailsByShoppingId(id_shopping: number): Observable<any> {
    return this.http.get(`${this.DETAIL_SHOPPING_URL}?id_shopping=${id_shopping}`);
  }

  createDetail(data: any): Observable<any> {
    return this.http.post(this.DETAIL_SHOPPING_URL, data);
  }

  editDetail(id: string, data: any): Observable<any> {
    return this.http.put(`${this.DETAIL_SHOPPING_URL}/${id}`, data);
  }

  deleteDetail(id: string): Observable<any> {
    return this.http.delete(`${this.DETAIL_SHOPPING_URL}/${id}`);
  }
}
