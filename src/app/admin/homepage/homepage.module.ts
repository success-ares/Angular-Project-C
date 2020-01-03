import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { EditSectionComponent } from './edit-section.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from '../../shared/shared.module';
import { HomepageService } from './homepage.service';

@NgModule({
  imports: [
    HomepageRoutingModule,
    FormsModule,
    CommonModule,
    CKEditorModule,
    SharedModule
  ],
  declarations: [ HomepageComponent, EditSectionComponent ],
  providers: [ HomepageService ]
})
export class HomepageModule { }
