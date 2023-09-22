import { Component, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  displayNotification: boolean = false;
  notificationString: string = '';

  constructor(private _notificationService: NotificationService) {}

  ngOnInit() {
    this._notificationService.notification.subscribe((notification) => {
      this.displayNotification = true;
      this.notificationString = notification;
    });
  }

  clearNotification() {
    this.displayNotification = false;
  }
}
