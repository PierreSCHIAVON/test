import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'app/Model/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product : Product | undefined 
  // private apiUrl = 'http://localhost:8080/product'; lien pour la connexion à la BDD
  private apiUrl = 'front/assets/products.json';

  constructor(private http : HttpClient) { }

  createProduct(productData: { code: string , name: string, description : string, price : number, quantity : number, inventoryStatus : string, category : string, image?:string, rating? : number }): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}`, productData);
  }

  getProduct(id:number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`); 
  }

}
