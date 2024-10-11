import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<any[]> {

    return this.httpClient.get<any[]>(`${this.baseUrl}productos`);

  }

  getProducto( id: number ): Observable<any[]> {

    return this.httpClient.get<any>(`${this.baseUrl}productos/${id}`);

  }

  createProducto( producto: any ): Observable<any> {

    return this.httpClient.post<any>(`${this.baseUrl}crearProducto`, producto);

  }

  updateProducto( id: number, producto: any ): Observable<any> {

    return this.httpClient.put<any>(`${this.baseUrl}productos/${id}`, producto);

  }

  deleteProducto( id: number ): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}productos/${id}`);
  }
}
