// import 'hammerjs';
import 'mousetrap';
import { ModalGalleryModule } from '@ks89/angular-modal-gallery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app.routing';


import { AppComponent } from './app.component';
import { AppOutletComponent } from './app-outlet.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AppOutletComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'skywalk'
    }),
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ModalGalleryModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
