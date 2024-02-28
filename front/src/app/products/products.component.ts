import { Component, OnInit } from '@angular/core';
import { Product } from 'app/Model/product.model';
import { ProductService } from 'app/service/product.service';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
getSeverity(_t6: any) {
throw new Error('Method not implemented.');
}

  productList: Product[] = [];
products: any;
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

}
