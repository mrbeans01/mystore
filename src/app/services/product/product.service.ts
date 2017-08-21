import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


import { Product } from '../../models/productModel';

@Injectable()
export class ProductService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private productUrl  = '../assets/productlist.json';

  constructor(private http: Http) { }

  getProducts(): Promise<Product[]> {
    return this.http.get(this.productUrl)
      .toPromise()
      .then(response => {
          return Promise.resolve(<Product[]>response.json());
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
