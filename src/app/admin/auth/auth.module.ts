import { NgModule } from '@angular/core';


import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [
      LoginComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
