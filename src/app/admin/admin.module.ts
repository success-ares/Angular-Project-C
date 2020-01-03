import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, CommonModule } from '@angular/common';

// AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
// Routing Module
import { AdminRoutingModule } from './admin.routing';

// Layouts
import { AdminFullLayoutComponent } from './layouts/admin-full-layout.component';
import { AuthModule } from './auth/auth.module';
import { SharedService } from '../shared/services/shared.service';
import { AuthGuardService } from './auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AuthServiceService } from './auth-service.service';
import { EditOrAddProjectPageComponent } from './projects/edit-or-add-project-page/edit-or-add-project-page.component';
import { GoogleMapsComponent } from './component/google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { WysiwygComponent } from './component/wysiwyg/wysiwyg.component';
import { CareersPageComponent } from './careers/careers-page/careers-page.component';
import { EditOrAddCareerPageComponent } from './careers/edit-or-add-career-page/edit-or-add-career-page.component';
import { PartnersComponent } from './partners/partners.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { EditOrAddPageComponent } from './generic-pages/edit-or-add-page/edit-or-add-page.component';
import { PagesComponent } from './generic-pages/pages/pages.component';
import { AddNewCategoryDialogComponent } from './careers/add-new-category-dialog/add-new-category-dialog.component';
import { EditOrAddBenefitPageComponent } from './careers/edit-or-add-benefit-page/edit-or-add-benefit-page.component';
import { UploadingImageComponent } from './component/uploading-image/uploading-image.component';
import { SectionComponent } from './component/section/section.component';
import { HeaderComponent } from './component/header/header.component';
import { ElementComponent } from './component/element/element.component';
import { SkywalkDevelopmentsComponent } from './skywalk-developments/skywalk-developments/skywalk-developments.component';
import { SkywalkAboutUsComponent } from './skywalk-developments/skywalk-about-us/skywalk-about-us.component';
import { SkywalkOurPhilosophyComponent } from './skywalk-developments/skywalk-our-philosophy/skywalk-our-philosophy.component';
import { SkywalkOurKeyToSuccessComponent } from './skywalk-developments/skywalk-our-key-to-success/skywalk-our-key-to-success.component';
import { SkywalkOurPartnersComponent } from './skywalk-developments/skywalk-our-partners/skywalk-our-partners.component';
import { SkywalkProjectComponent } from './skywalk-project/skywalk-project/skywalk-project.component';
import { SkywalkDestinationComponent } from './skywalk-project/skywalk-destination/skywalk-destination.component';
import { SkywalkLocationComponent } from './skywalk-project/skywalk-location/skywalk-location.component';
import { SkywalkElementsComponent } from './skywalk-project/skywalk-elements/skywalk-elements.component';
import { AddOrEditSkywalkElementComponent } from './skywalk-project/add-or-edit-skywalk-element/add-or-edit-skywalk-element.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TreeNodeComponent } from './navbar/tree-node/tree-node.component';
import { EditOrAddSectionComponent } from './generic-pages/edit-or-add-section/edit-or-add-section.component';
import { ContactModalComponent } from './contact/contact-modal/contact-modal.component';
import { ContactComponent } from './contact/contact.component';

import { EditOrAddNewsComponent } from './news-page/edit-or-add-news/edit-or-add-news.component';
import { NewsComponent } from './news-page/news/news.component';
import { CeoMessageComponent } from './ceo-message/ceo-message.component';
import { NotificationComponent } from './notification/notification.component';
import { EditOrAddEventComponent } from './events-page/edit-or-add-event/edit-or-add-event.component';
import { EventsComponent } from './events-page/events/events.component';
import { EditOrAddPressReleaseComponent } from './press-releases-page/edit-or-add-press-release/edit-or-add-press-release.component';
import { PressReleasesComponent } from './press-releases-page/press-releases/press-releases.component';
import { ImageGalleryComponent } from './image-gallery-page/image-gallery/image-gallery.component';
import { VideoGalaryComponent } from './video-galary/video-galary.component';
import { PartnerFormComponent } from './partners/partner-form/partner-form.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    SharedModule,
    CKEditorModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2TGKbE4EFrBdj09OEEYPDh6VW3BKp0nA'
    }),
  ],
  declarations: [
    AdminFullLayoutComponent,
    PartnersComponent,
    EditOrAddProjectPageComponent,
    GoogleMapsComponent,
    WysiwygComponent,
    CareersPageComponent,
    EditOrAddCareerPageComponent,
    EditOrAddPageComponent,
    PagesComponent,
    AddNewCategoryDialogComponent,
    EditOrAddBenefitPageComponent,
    UploadingImageComponent,
    SectionComponent,
    HeaderComponent,
    ElementComponent,
    SkywalkDevelopmentsComponent,
    SkywalkAboutUsComponent,
    SkywalkOurPhilosophyComponent,
    SkywalkOurKeyToSuccessComponent,
    SkywalkOurPartnersComponent,
    SkywalkProjectComponent,
    SkywalkDestinationComponent,
    SkywalkLocationComponent,
    SkywalkElementsComponent,
    AddOrEditSkywalkElementComponent,
    NavbarComponent,
    TreeNodeComponent,
    EditOrAddSectionComponent,
    ContactComponent,
    ContactModalComponent,
    NewsComponent,
    EditOrAddNewsComponent,
    CeoMessageComponent,
    NotificationComponent,
    EditOrAddEventComponent,
    EventsComponent,
    EditOrAddPressReleaseComponent,
    PressReleasesComponent,
    ImageGalleryComponent,
    VideoGalaryComponent,
    PartnerFormComponent,
  ],
  entryComponents: [
    AddNewCategoryDialogComponent,
    ContactModalComponent,
    PartnerFormComponent,
  ],
  providers: [
    SharedService,
    AuthGuardService,
    AuthServiceService
  ],
  bootstrap: [AdminFullLayoutComponent]
})
export class AdminModule { }
