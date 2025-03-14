import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  filter(arg0: (p: any) => any): never[] {
    throw new Error('Method not implemented.');
  }

  private PRODUCT_URL = environment.PRODUCT_URL; DETAIL_PURCHASES_URL = environment.DETAIL_PURCHASES_URL;

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.PRODUCT_URL}`);
  }

  getProdutById(id: number): Observable<any> {
    return this.http.get(`${this.PRODUCT_URL}/${id}`);
  }

  getProductByName(name: string): Observable<any> {
    return this.http.get(`${this.PRODUCT_URL}?name=${name}`);
  }

  getProductByCode(code: string): Observable <any>{
    return this.http.get(`${this.PRODUCT_URL}/code/${code}`);
  }

  createProduct(data: any): Observable<any> {
    console.log('Enviando datos:', data); // Verifica en la consola
    return this.http.post(this.PRODUCT_URL, data);
  }

  updateProductStock(id_products: string, newStock: number, newUnitPrice: number): Observable<any> {
    return this.http.put(`${this.PRODUCT_URL}/${id_products}`, { stock: newStock, unit_price: newUnitPrice });
  }

}

export interface Products {
  id_products?: number;  // Opcional para que no sea obligatorio al crear
  code: string;
  name: string;
  description: string;
  stock: string;
  unit_price: string;

}