import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Shopping } from '../../models/shoppings';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  private apiUrl = environment.SHOPPING_URL;

  constructor(private http: HttpClient) {}

  createShopping(shoppingData: Shopping): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, shoppingData)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la solicitud:', error);
    let errorMsg = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      errorMsg = `Error del cliente: ${error.error.message}`;
    } else {
      if (error.status === 400) {
        errorMsg = error.error.error || 'Solicitud incorrecta';
      } else if (error.status === 500) {
        errorMsg = 'Error interno del servidor';
      }
    }
    return throwError(() => new Error(errorMsg));
  }
}
