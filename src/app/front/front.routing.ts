import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontFullLayoutComponent } from './layouts/front-full-layout.component';

import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { GenericComponent } from './generic/generic.component';
import { ContactusPageComponent } from './contactus-page/contactus-page.component';
import { CareerComponent } from './career/career.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProjectDetailsPageComponent } from './projects/project-details-page/project-details-page.component';
import { SkyAboutUsComponent } from './developments/sky-about-us/sky-about-us.component';
import { PhilosophyComponent } from './developments/philosophy/philosophy.component';
import { PartnersComponent } from './developments/partners/partners.component';
import { KeysToSuccessComponent } from './developments/keys-to-success/keys-to-success.component';

import { DestnationComponent } from './sky-projects/destnation/destnation.component';
import { LocationComponent } from './sky-projects/location/location.component';
import {ConceptComponent} from './sky-projects/concept/concept.component';

import { ElementsComponent } from './sky-projects/elements/elements.component';
import { SpecialityElementsComponent } from './sky-projects/speciality-elements/speciality-elements.component';
import { Phase1Component } from './sky-projects/phase1/phase1.component';
import {NewsComponent} from './news/news/news.component';
import { NewsDetailsComponent } from './news/news-details/news-details.component';

import {NavbarComponent} from './components/navbar/navbar.component';

import { CeoMessagePageComponent } from './ceo-message-page/ceo-message-page.component';
import { GenericBlogComponent } from './generic-blog/generic-blog.component';
import { BlogDetailsComponent } from './generic-blog/blog-details/blog-details.component';
import {ImageGalleryComponent} from './image-gallery-page/image-gallery/image-gallery.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';

export const routes: Routes = [
  {
    path: '',
    component: FrontFullLayoutComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'p/:pageName',
        component: GenericComponent
      },
      {
        path: 'project',
        component: ProjectDetailsPageComponent,
      },
      {
        path: 'contactus',
        component: ContactusPageComponent
      },
      {
        path: 'career',
        component: CareerComponent
      },
      {
        path: 'about-us',
        component: AboutUsComponent
      },
      {
        path: 'skywalk-developments/about-us',
        component: SkyAboutUsComponent
      },
      {
        path: 'skywalk-developments/philosophy',
        component: PhilosophyComponent
      },
      {
        path: 'skywalk-developments/key-to-sucess',
        component: KeysToSuccessComponent
      },
      {
        path: 'skywalk-developments/partners',
        component: PartnersComponent
      },
      {
        path: 'skywalk-projects/location',
        component: LocationComponent
      },
      {
        path: 'skywalk-projects/destination',
        component: DestnationComponent
      },
      {
        path: 'skywalk-projects/skyelements',
        component: ElementsComponent
      },
      {
        path: 'skywalk-projects/specialty-elements',
        component: SpecialityElementsComponent
      },
      {
        path: 'skywalk-projects/masterplan',
        component: Phase1Component
      },
      {
        path: 'skywalk-projects/concept',
        component: ConceptComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'news/:id',
        component: NewsDetailsComponent,
      },
      {
        path: 'ceo-message',
        component: CeoMessagePageComponent
      },
      {
        path: 'g/:pageName',
        component: GenericBlogComponent
      },
      {
        path: 'g/:pageName/:id',
        component: BlogDetailsComponent
      },
      {
        path: 'imageGallery',
        component: ImageGalleryComponent
      },
      {
        path: 'videoGallery',
        component: VideoGalleryComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
