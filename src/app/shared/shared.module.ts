///<reference path="services/seo.service.ts"/>
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MaterialsModule } from './materials.module';

// i18n
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

// Custom Services
import { SharedService } from './services/shared.service';
import { UploadService } from './services/upload.service';
import { UserService } from './services/user.service';
import { SeoService } from "./services/seo.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    MaterialsModule,
    ReactiveFormsModule
  ],
  providers: [
    SharedService,
    UploadService,
    UserService,
    SeoService,
  ]
})

export class SharedModule { }
