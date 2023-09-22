import { Component , Output, EventEmitter  } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-dropdown-menu',
  templateUrl: './product-dropdown-menu.component.html',
  styleUrls: ['./product-dropdown-menu.component.scss'],
})
export class ProductDropdownMenuComponent {
  displayActiveMenu: boolean = false;
  filterInput: string = '';
  products: any[] = [];
  private productSubscription: Subscription | undefined;
  @Output() toggleProductMenu = new EventEmitter<boolean>();

  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsList();
  }
  // method to filter products
  getProductsList(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    this.productSubscription = this._productService
      .getProducts(this.filterInput)
      .subscribe((products) => {
        this.products = products;
      });
  }
  // Method To Toggel Active Menu
  toggelActiveMenu(): void {
    this.displayActiveMenu = !this.displayActiveMenu;
    this.toggleProductMenu.emit(true);
  }
  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }
}
