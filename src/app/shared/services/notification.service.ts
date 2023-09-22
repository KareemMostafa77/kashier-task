import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<string>();
  public notification = this.notificationSubject.asObservable();

  // method to send notification
  sendNotification(notification: any): void {
    this.notificationSubject.next(notification);
  }
}
