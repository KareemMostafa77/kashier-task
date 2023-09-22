import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NotificationService } from '../../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsSubject = new BehaviorSubject<any[]>([]);
  private productList = this.productsSubject.asObservable();

  constructor(private _notificationService: NotificationService) {}
  // Method to get products
  getProducts(filter: string): Observable<any[]> {
    if (!filter) return this.productList;
    else
      return this.productList.pipe(
        map((products) => {
          return products.filter((product) =>
            product.productName.toLowerCase().includes(filter.toLowerCase())
          );
        })
      );
  }
  // Method to get  product ID
  getProductById(id: number): Observable<any> {
    return this.productList.pipe(
      map((products) => products.find((product) => product.id == id))
    );
  }
  // Method To Add New Product
  addNewProduct(product: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = [
      ...currentProducts,
      { id: Math.floor(1000000 + Math.random() * 9000000), ...product },
    ];
    this.productsSubject.next(updatedProducts);
    this._notificationService.sendNotification('Changes saved succerssfully');
  }
  // Method to update product by ID
  updateProduct(updatedValues: any): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.map((product) => {
      if (product.id == updatedValues.id) {
        return { ...product, ...updatedValues };
      } else {
        return product;
      }
    });
    this.productsSubject.next(updatedProducts);
    this._notificationService.sendNotification('Changes saved succerssfully');
  }
  // Method to delete product by ID
  deleteProductById(id: number): void {
    const currentProducts = this.productsSubject.getValue();
    const updatedProducts = currentProducts.filter(
      (product) => product.id != id
    );
    this.productsSubject.next(updatedProducts);
    this._notificationService.sendNotification('Product deleted successfully');
  }
}
