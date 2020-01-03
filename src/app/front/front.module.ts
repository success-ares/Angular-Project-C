import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import { NgModule } from '@angular/core';

import { FrontRoutingModule } from './front.routing';
import { SharedModule } from '../shared/shared.module';

import { FrontFullLayoutComponent } from './layouts/front-full-layout.component';

import { HomeComponent } from './home/home.component';

import { UserService } from '../shared/services/user.service';
import { SharedService } from '../shared/services/shared.service';
import { AuthGuardService } from './auth-guard.service';
import { GenericComponent } from './generic/generic.component';
import { NguCarouselModule } from '@ngu/carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { CareersComponent } from './components/careers/careers.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactusPageComponent } from './contactus-page/contactus-page.component';
import { CareerComponent } from './career/career.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProjectDetailsPageComponent } from './projects/project-details-page/project-details-page.component';
import { SharedSectionComponent } from './components/shared-section/shared-section.component';
import { SharedHeaderComponent } from './components/shared-header/shared-header.component';
import { SharedContactUsFormComponent } from './components/shared-contact-us-form/shared-contact-us-form.component';
import { PhilosophyComponent } from './developments/philosophy/philosophy.component';
import { SkyAboutUsComponent } from './developments/sky-about-us/sky-about-us.component';
import { PartnersComponent } from './developments/partners/partners.component';
import { KeysToSuccessComponent } from './developments/keys-to-success/keys-to-success.component';
import { DestnationComponent } from './sky-projects/destnation/destnation.component';
import { LocationComponent } from './sky-projects/location/location.component';
import { NgwWowModule } from 'ngx-wow';
import { ElementsComponent } from './sky-projects/elements/elements.component';
import { SpecialityElementsComponent } from './sky-projects/speciality-elements/speciality-elements.component';
import { Phase1Component } from './sky-projects/phase1/phase1.component';
import { ConceptComponent } from './sky-projects/concept/concept.component';
import { NewsComponent } from './news/news/news.component';
import { FiterByIndexPipe } from './components/fiter-by-index.pipe';
import { SharedNotificationComponent } from './components/shared-notification/shared-notification.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavbarItemComponent } from './components/navbar-item/navbar-item.component';
import { CeoMessagePageComponent } from './ceo-message-page/ceo-message-page.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';
import { GenericBlogComponent } from './generic-blog/generic-blog.component';
import { BlogDetailsComponent } from './generic-blog/blog-details/blog-details.component';
import { ImageGalleryComponent } from './image-gallery-page/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { VideoModalComponent } from './video-gallery/video-modal/video-modal.component';
import { SeoService } from "../shared/services/seo.service";

@NgModule({
  declarations: [
    FrontFullLayoutComponent,
    HomeComponent,
    CarouselComponent,
    GenericComponent,
    AboutusComponent,
    ProjectsComponent,
    CareersComponent,
    ContactComponent,
    ContactusPageComponent,
    CareerComponent,
    AboutUsComponent,
    ProjectDetailsPageComponent,
    SharedSectionComponent,
    SharedHeaderComponent,
    SharedContactUsFormComponent,
    PhilosophyComponent,
    SkyAboutUsComponent,
    PartnersComponent,
    KeysToSuccessComponent,
    DestnationComponent,
    LocationComponent,
    ConceptComponent,
    ElementsComponent,
    SpecialityElementsComponent,
    Phase1Component,
    NewsComponent,
    FiterByIndexPipe,
    SharedNotificationComponent,
    NavbarComponent,
    NavbarItemComponent,
    CeoMessagePageComponent,
    NewsDetailsComponent,
    GenericBlogComponent,
    BlogDetailsComponent,
    ImageGalleryComponent,
    VideoGalleryComponent,
    VideoModalComponent
  ],
  imports: [
    NguCarouselModule,
    FrontRoutingModule,
    SharedModule,
    NgwWowModule,
    ModalGalleryModule,
  ],

  providers: [
    UserService,
    SharedService,
    AuthGuardService,
  ],
  entryComponents: [
    VideoModalComponent
  ]
})
export class FrontModule { }
