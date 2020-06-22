import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ngx-spinner></ngx-spinner>
    <simple-notifications [options]="toastOptions"></simple-notifications>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'yalantis-test';

  toastOptions = {
    position: ['top', 'right'],
    showProgressBar: false,
  };

  openAddImageModal() {

  }
}
