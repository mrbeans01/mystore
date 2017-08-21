import { Component, OnInit } from '@angular/core';
import { Product } from '../models/productModel';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'My Product';
  products: Product[];
  constructor(private productService: ProductService) { }

  getProducts(): void {
    this.productService
      .getProducts()
      .then(products => this.products = products);
  }
  ngOnInit(): void {
    this.getProducts();
  }

}
