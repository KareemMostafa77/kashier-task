import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ProductDropdownMenuComponent } from './components/product-dropdown-menu/product-dropdown-menu.component';
import { CreateUpdateProductComponent } from './components/create-update-product/create-update-product.component';

const routes = [
  // Define your routes specific to  components
  { path: 'create-product', component: CreateUpdateProductComponent },
  { path: 'update-product/:id', component: CreateUpdateProductComponent },
];

@NgModule({
  declarations: [
    ProductDropdownMenuComponent,
    CreateUpdateProductComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    ProductDropdownMenuComponent,
    CreateUpdateProductComponent,
    RouterModule
  ]
})
export class FeatureModule {}
