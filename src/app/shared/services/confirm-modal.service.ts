import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmModalService {
  private confirmModalSubject = new Subject<string>();
  public confirmModal = this.confirmModalSubject.asObservable();

  // method to request confirm
  requestConfirm(data: any): void {
    this.confirmModalSubject.next(data);
  }
}
