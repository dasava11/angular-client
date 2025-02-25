import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private CUSTOMER_URL = environment.CUSTOMER_URL;

  constructor(private http: HttpClient) { }

  

  getAllCustomers(): Observable<any> {
    return this.http.get(`${this.CUSTOMER_URL}`);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get(`${this.CUSTOMER_URL}/${id}`);
  }

  getCustomerByName(name: string): Observable<any> {
    return this.http.get(`${this.CUSTOMER_URL}?name=${name}`);
  }

  createCustomer(data: any): Observable<any> {
    return this.http.post(this.CUSTOMER_URL, data);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.CUSTOMER_URL}/${id}`);
  }

  editCustomer(id: number, data:{name:string; document:number; phone:number;email:string}): Observable<any> {
    return this.http.put(`${this.CUSTOMER_URL}/${id}`, data);
  }
}


