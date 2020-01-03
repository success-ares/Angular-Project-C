import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { AdminFullLayoutComponent } from './layouts/admin-full-layout.component';

import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './auth-guard.service';
import { PartnersComponent } from './partners/partners.component';
import { EditOrAddProjectPageComponent } from './projects/edit-or-add-project-page/edit-or-add-project-page.component';
import { CareersPageComponent } from './careers/careers-page/careers-page.component';
import { EditOrAddCareerPageComponent } from './careers/edit-or-add-career-page/edit-or-add-career-page.component';
import { PagesComponent } from './generic-pages/pages/pages.component';
import { EditOrAddPageComponent } from './generic-pages/edit-or-add-page/edit-or-add-page.component';
import { EditOrAddBenefitPageComponent } from './careers/edit-or-add-benefit-page/edit-or-add-benefit-page.component';
import { SkywalkDevelopmentsComponent } from './skywalk-developments/skywalk-developments/skywalk-developments.component';
import { SkywalkAboutUsComponent } from './skywalk-developments/skywalk-about-us/skywalk-about-us.component';
import { SkywalkOurPhilosophyComponent } from './skywalk-developments/skywalk-our-philosophy/skywalk-our-philosophy.component';
import { SkywalkOurKeyToSuccessComponent } from './skywalk-developments/skywalk-our-key-to-success/skywalk-our-key-to-success.component';
import { SkywalkOurPartnersComponent } from './skywalk-developments/skywalk-our-partners/skywalk-our-partners.component';
import {SkywalkProjectComponent} from './skywalk-project/skywalk-project/skywalk-project.component';
import {SkywalkDestinationComponent} from './skywalk-project/skywalk-destination/skywalk-destination.component';
import {SkywalkElementsComponent} from './skywalk-project/skywalk-elements/skywalk-elements.component';
import {SkywalkLocationComponent} from './skywalk-project/skywalk-location/skywalk-location.component';
import {AddOrEditSkywalkElementComponent} from './skywalk-project/add-or-edit-skywalk-element/add-or-edit-skywalk-element.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { EditOrAddSectionComponent } from './generic-pages/edit-or-add-section/edit-or-add-section.component';


import { EditOrAddNewsComponent } from './news-page/edit-or-add-news/edit-or-add-news.component';
import { NewsComponent } from './news-page/news/news.component';

import { CeoMessageComponent } from './ceo-message/ceo-message.component';
import { NotificationComponent } from './notification/notification.component';
import { EventsComponent } from './events-page/events/events.component';
import { EditOrAddEventComponent } from './events-page/edit-or-add-event/edit-or-add-event.component';
import { PressReleasesComponent } from './press-releases-page/press-releases/press-releases.component';
import { EditOrAddPressReleaseComponent } from './press-releases-page/edit-or-add-press-release/edit-or-add-press-release.component';
import { ImageGalleryComponent } from './image-gallery-page/image-gallery/image-gallery.component';
import { VideoGalaryComponent } from "./video-galary/video-galary.component";


export const routes: Routes = [
  {
    path: '',
    component: AdminFullLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage'
      },
       {
        path: 'navbar',
        component: NavbarComponent
      },
      {
        path: 'project',
        component: EditOrAddProjectPageComponent
      },
      {
        path: 'careers',
        component: CareersPageComponent
      },
      {
        path: 'skywalkDevelopments',
        component: SkywalkDevelopmentsComponent
      },
      {
        path: 'skywalkDevelopments/aboutUs',
        component: SkywalkAboutUsComponent
      },
      {
        path: 'skywalkDevelopments/ourPhilosophy',
        component: SkywalkOurPhilosophyComponent
      },
      {
        path: 'skywalkDevelopments/ourKeysToSuccess',
        component: SkywalkOurKeyToSuccessComponent
      },
      {
        path: 'skywalkDevelopments/ourPartners',
        component: SkywalkOurPartnersComponent
      },
      {
        path: 'skywalkProject',
        component: SkywalkProjectComponent
      },
      {
        path: 'skywalkProject/destination',
        component: SkywalkDestinationComponent
      },
      {
        path: 'skywalkProject/location',
        component: SkywalkLocationComponent
      },
      {
        path: 'skywalkProject/elements',
        component: SkywalkElementsComponent
      },
      {
        path: 'skywalkProject/elements/new',
        component: AddOrEditSkywalkElementComponent
      },
      {
        path: 'skywalkProject/elements/:elementId/edit',
        component: AddOrEditSkywalkElementComponent
      },
      {
        path: 'careers/benefit/new',
        component: EditOrAddBenefitPageComponent,
      },
      {
        path: 'careers/benefit/:benefitId/edit',
        component: EditOrAddBenefitPageComponent,
      },
      {
        path: 'careers/new',
        component: EditOrAddCareerPageComponent
      },
      {
        path: 'careers/:careerId/edit',
        component: EditOrAddCareerPageComponent
      },
      {
        path: 'genericPages',
        component: PagesComponent
      },
      {
        path: 'genericPages/new',
        component: EditOrAddPageComponent
      },
      {
        path: 'genericPages/:pageId/edit',
        component: EditOrAddPageComponent
      },
       {
        path: 'genericPages/:pageId/edit/:sectionId',
        component: EditOrAddSectionComponent
      },
      {
        path: 'genericPages/:pageId/section',
        component: EditOrAddSectionComponent
      },
      {
        path: 'homepage',
        loadChildren: './homepage/homepage.module#HomepageModule'
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'news',
        component: NewsComponent
      },
      {
        path: 'add-news',
        component: EditOrAddNewsComponent
      },
      {
        path: 'edit-news/:id',
        component: EditOrAddNewsComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'add-event',
        component: EditOrAddEventComponent
      },
      {
        path: 'edit-event/:id',
        component: EditOrAddEventComponent
      },
      {
        path: 'pressReleases',
        component: PressReleasesComponent
      },
      {
        path: 'add-pressRelease',
        component: EditOrAddPressReleaseComponent
      },
      {
        path: 'edit-pressRelease/:id',
        component: EditOrAddPressReleaseComponent
      },
      {
        path: 'imageGallery',
        component: ImageGalleryComponent
      },{
        path: 'videoGallery',
        component: VideoGalaryComponent
      },
      {
        path: 'ceo-message',
        component: CeoMessageComponent
      },
      {
        path: 'notification',
        component: NotificationComponent
      },
      {
        path: 'partners',
        component: PartnersComponent,
        data: {
          title: 'Our Partners'
        }
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    AuthModule],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

// @NgModule({
//   imports: [ RouterModule.forRoot(routes) ],
//   exports: [ RouterModule ]
// })
// export class AppRoutingModule {}
