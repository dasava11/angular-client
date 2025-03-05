import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  

  private SHOPPING_URL = environment.SHOPPING_URL;

  constructor(private http: HttpClient) { }

  getAllShoppings(): Observable<any> {
    return this.http.get(`${this.SHOPPING_URL}`);
  }

  getShoppingById(id: number): Observable<any> {
    return this.http.get(`${this.SHOPPING_URL}/${id}`);
  }

  createShopping(data: any): Observable<any> {
    return this.http.post(this.SHOPPING_URL, data);
  }

  updateShopping(id: number, data: any): Observable<any> {
    return this.http.put(`${this.SHOPPING_URL}/${id}`, data);
  }

  deleteShopping(id: number): Observable<any> {
    return this.http.delete(`${this.SHOPPING_URL}/${id}`);
  }
}

