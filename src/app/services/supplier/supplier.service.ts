import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Supplier } from '../../models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private SUPPLIER_URL = environment.SUPPLIER_URL;

  constructor(private http: HttpClient) { }

  createSuppliers(data: Supplier): Observable<any> {
    return this.http.post(this.SUPPLIER_URL, data)
      .pipe(catchError(this.handleError));
  }

  getAllSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.SUPPLIER_URL)
      .pipe(catchError(this.handleError));
  }

  getSuppliersById(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.SUPPLIER_URL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  getSuppliersByName(name: string): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(`${this.SUPPLIER_URL}?name=${name}`)
      .pipe(catchError(this.handleError));
  }

  updateSupplier(id_suppliers: number, supplierData: Partial<Supplier>): Observable<Supplier> {
    return this.http.put<Supplier>(`${this.SUPPLIER_URL}/${id_suppliers}`, supplierData)
      .pipe(catchError(this.handleError));
  }

  updateSupplierStatus(id_suppliers: number, active: boolean): Observable<any> {
    return this.http.put(`${this.SUPPLIER_URL}/${id_suppliers}`, { active })
      .pipe(catchError(this.handleError));
  }

  /** 🔴 Desactivar/Activar proveedor (NO lo elimina de la BD) */
  deleteSupplier(id_suppliers: number): Observable<any> {
    return this.http.delete(`${this.SUPPLIER_URL}/${id_suppliers}`)
      .pipe(catchError(this.handleError));
  }

  /** ❌ Eliminar proveedor permanentemente */
  destroySupplier(id_suppliers: number): Observable<any> {
    return this.http.delete(`${this.SUPPLIER_URL}/destroy/${id_suppliers}`)
      .pipe(catchError(this.handleError));
  }

  /** 🔴 Método para manejar errores en las peticiones HTTP */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Error ${error.status}: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
