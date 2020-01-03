import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Injectable()
export class SeoService {
  // default values
  latestTag = {};
  defaultValues = {
    mainTitle: 'Skywalk',
    siteName: 'Skywalk',
    description: `Skywalk Developments is a pioneering Real-Estate Developer focused on building
        innovative and differentiated projects in Egypt.
        The company is set out to build iconic landmarks across the nation and is kicking off
        its project roster with its first landmark project, Skywalk.`,
    baseURL: 'https://skywalk-website-dev.firebaseapp.com',
    tags: 'Skywalk',
    // tslint:disable-next-line:max-line-length
    logo: 'https://firebasestorage.googleapis.com/v0/b/skywalk-website-dev.appspot.com/o/homepage%2Fcarousel%2F0wVVtaGkAW842OEhxN9ifxK2KwW3KgYE.jpg?alt=media&token=75ab0757-8a03-46ec-b861-cd608d86e266',


  };

  databaseTags = [];

  constructor(private meta: Meta, private titleService: Title) { }

  updateDBDefaults(tagsArray: Array<string>, defaultDBValues: Object) {
    this.databaseTags = tagsArray;
    this.defaultValues = Object.assign(this.defaultValues, defaultDBValues);
    this.generateTags(this.latestTag);
  }

  generateTags(tags) {
    tags = {
      title: '',
      description: this.defaultValues.description,
      image: this.defaultValues.logo,
      slug: '',
      ...tags
    };

    // Save the latest tag updates
    this.latestTag = tags;

    let pageTitle = this.defaultValues.mainTitle;
    if (tags.title && tags.title.length > 0) {
      pageTitle = `${tags.title} - ${this.defaultValues.mainTitle}`;
    }

    // Set google verification ID (Changes from Dev to Prod)
    this.meta.updateTag({ name: 'google-site-verification', content: environment.googleSiteVerification });

    // Set a title
    this.titleService.setTitle(pageTitle);

    // Set traditional Tags
    this.meta.updateTag({ name: 'description', content: tags.description });
    
    // TODO For some reason the method was called a second time and the description was not updated. This is a temp solution
    if(tags.description === undefined) {
      tags.description = this.defaultValues.description;
    }

    this.meta.updateTag({
      name: 'tags',
      content: `${tags.description.replace(' ', ',')},${this.defaultValues.tags},${tags.title},${this.databaseTags.join(',')}`,
    });

    // Set meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: this.defaultValues.siteName.replace(' ', '') });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: tags.description });
    this.meta.updateTag({ name: 'twitter:image', content: tags.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: this.defaultValues.siteName });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: tags.description });
    this.meta.updateTag({ property: 'og:image', content: tags.image });
    this.meta.updateTag({ property: 'og:image:width', content: '200' });
    this.meta.updateTag({ property: 'og:image:height', content: '200' });
    this.meta.updateTag({ property: 'og:url', content: `${this.defaultValues.baseURL}${tags.slug}` });
  }
}
