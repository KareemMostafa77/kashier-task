import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    NotificationComponent,
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NotificationComponent,
    ConfirmModalComponent,
  ],
})
export class SharedModule {}
