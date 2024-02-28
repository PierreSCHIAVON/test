import { Component, OnInit } from '@angular/core';
import { Product } from 'app/Model/product.model';
import { ProductService } from 'app/service/product.service';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [],
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit{
  productList: Product[] = [];
  product : Product = { id: 0, code: "", name: "",description: "", price: null, quantity: null, inventoryStatus: "", category: "",  image: "", rating: null} 
  constructor (private productService : ProductService){} 
  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.productList = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  updateProduct(product:Product):void{
    this.productService.updateProduct(this.product).subscribe((result)=> {
      console.log('Produit mis à jour avec succès', result)
    });
  }

  deleteProduct(id:number):void{
    this.productService.deleteProduct(id).subscribe(()=>{
      console.log('Produit supprimé avec succès')
    });
  }
}
