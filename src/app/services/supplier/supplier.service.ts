import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class SupplierService {


  private SUPPLIER_URL = environment.SUPPLIER_URL;

  constructor(private http: HttpClient) { }

  createSuppliers(data: any): Observable<any> {
    return this.http.post(this.SUPPLIER_URL, data);
  }

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${this.SUPPLIER_URL}`);
  }

  getSuppliersById(id: number): Observable<any> {
    return this.http.get(`${this.SUPPLIER_URL}/${id}`);
  }

  getSuppliersByName(name: string): Observable<any> {
    return this.http.get(`${this.SUPPLIER_URL}?name=${name}`);
  }

  // editSuppliers(id: number, data: {nit:number; name:string; address:string; city:string;phone:number,email:string; active:boolean}): Observable<any> {
  //   return this.http.put(`${this.SUPPLIER_URL}/${id}`, data);
  // }

  updateSupplier(id_suppliers: number, supplierData: Partial<Supplier>): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.SUPPLIER_URL}/${id_suppliers}`, supplierData);
  }

  updateSupplierStatus(id_suppliers: number, deleted: boolean): Observable<any> {
    return this.http.put(`${this.SUPPLIER_URL}/${id_suppliers}`, {deleted});
  }

  deleteSuppliers(santuario_id: number): Observable<any> {
    return this.http.delete(`${this.SUPPLIER_URL}/delete/${santuario_id}`);
  }


}

export interface Supplier {

  id_suppliers?: number;
  nit: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  active: boolean;
  
}

