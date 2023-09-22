import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { ConfirmModalService } from '../../../../shared/services/confirm-modal.service';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss'],
})
export class CreateUpdateProductComponent {
  pageForm: FormGroup;
  pageOperationUpdate: boolean;
  selectedProduct: any;
  selectedProductId: number = 0;
  showPassword = false;

  constructor(
    private _productService: ProductService,
    private _confirmModalService: ConfirmModalService,
    private _router: Router,
    private route: ActivatedRoute
  ) {
    // to check page for create or update
    this.pageOperationUpdate = this._router.url.includes('create-product')
      ? false
      : true;
    this.pageForm = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      productType: new FormControl('1', [Validators.required]),
      productCategory: new FormControl('', [Validators.required]),
      isSubCategory: new FormControl(),
      productRefId: new FormControl('', [
        Validators.min(0),
        Validators.pattern(/^\d+$/),
      ]),
      productPassword: new FormControl('', [Validators.required]),
      productDeliveryFeesPrice: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      productDeliveryFeesPercentage: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
    if (this.pageOperationUpdate) {
      this.route.params.subscribe((params) => {
        this.selectedProductId = params['id'];
        this._productService
          .getProductById(params['id'])
          .subscribe((product) => {
            this.setProductValues(product);
          });
      });
    }
  }

  // Method To Set Values in form
  setProductValues(product: any) {
    this.selectedProduct = product;
    this.pageForm.patchValue(product);
  }

  // Method To Get Data From Form and save it
  saveChanges(): void {
    const updatedProduct = {
      id: this.selectedProductId,
      ...this.pageForm.value,
    };
    this._confirmModalService.requestConfirm({
      operatation: true,
      product: updatedProduct,
    });
  }

  // Method To Delete Prduct
  deleteProduct(): void {
    this._confirmModalService.requestConfirm({
      operatation: false,
      product: this.selectedProduct,
    });
  }

  // Method to toggle password
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
