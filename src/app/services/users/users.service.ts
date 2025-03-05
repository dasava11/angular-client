import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private USERS_URL = environment.USERS_URL;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.USERS_URL}`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.USERS_URL}/${id}`);
  }

  getUserByName(username: string): Observable<any> {
    return this.http.get(`${this.USERS_URL}?username=${username}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(this.USERS_URL, data);
  }

  editUser(id: number, data: {username:string;password:string;email:string;type_user:number;active:boolean}): Observable<any> {
    return this.http.put(`${this.USERS_URL}/${id}`, data);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.USERS_URL}/${id}`);
  }
}