import { Component, OnInit } from '@angular/core';
import { Product } from '../models/productModel';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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
