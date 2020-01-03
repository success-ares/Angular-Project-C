import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  template: '<router-outlet></router-outlet>',
})
export class AppOutletComponent {

  constructor(
  ) {
  }
}
