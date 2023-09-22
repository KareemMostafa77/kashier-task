import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../feature/product/services/product-service';
import { ConfirmModalService } from '../../services/confirm-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent {
  modalOperatrion: boolean = true; // true for save and false for delete
  modalTitle: string = '';
  modalContent: string = '';
  displayModal: boolean = false;
  sharedProduct: any;

  constructor(
    private _confirmModalService: ConfirmModalService,
    private _productService: ProductService,
    private _router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._confirmModalService.confirmModal.subscribe((data: any) => {
      this.sharedProduct = data.product;
      this.modalOperatrion = data.operatation;
      this.modalTitle = this.modalOperatrion
        ? ' Save Changes ? '
        : `Delete " ${this.sharedProduct.productName} " ?`;
      this.modalContent = this.modalOperatrion
        ? 'Are you sure you want save changes ?'
        : `Are you sure you want to delete product? Once deleted, you won't be able to access it again.`;
      this.toggleModal();
    });
  }

  // Method to toggle modal
  toggleModal(): void {
    this.displayModal = !this.displayModal;
  }

  // Method to confirm
  confirm(): void {
    if (this.modalOperatrion) {
      if (this.sharedProduct.id)
        this._productService.updateProduct(this.sharedProduct);
      else this._productService.addNewProduct(this.sharedProduct);
    } else this._productService.deleteProductById(this.sharedProduct.id);
    this.toggleModal();
    this._router.navigate(['/']);
  }
}
