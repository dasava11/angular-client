import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeUserService {

  private TYPEUSER_URL=environment.TYPEUSER_URL;

  constructor(private http: HttpClient) { }

  createTypeUser(data:any):Observable<any>{
    return this.http.post(this.TYPEUSER_URL,data)
  };

  getAllTypeUsers():Observable<any>{
    return this.http.get(`${this.TYPEUSER_URL}`);
  };

  getTypeUserById(id:number):Observable<any>{
    return this.http.get(`${this.TYPEUSER_URL}/${id}`)
  };

  getTypeUserByName(name:string):Observable<any>{
    return this.http.get(`${this.TYPEUSER_URL}/search/${name}`)
  };

  editTypeUser(id: number, data: { rol: string; active: boolean }): Observable<any> {
    return this.http.put(`${this.TYPEUSER_URL}/${id}`, data);
  }

  deleteTypeUser(id:number):Observable<any>{
    return this.http.delete(`${this.TYPEUSER_URL}/${id}`)
  };
  





}
