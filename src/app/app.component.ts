import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title: string = 'Kashier Angular Task';
  displayPageContent: boolean = false;

  constructor() {}

  // Method To Toggel Active Menu
  togglePageContent(): void {
    this.displayPageContent = !this.displayPageContent;
  }
}
