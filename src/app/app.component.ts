import { Component } from '@angular/core';
import { SeoService } from './shared/services/seo.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SeoService ]
})
export class AppComponent {
  title = 'app';
  constructor(
    private seo: SeoService,
    private db: AngularFireDatabase,
  ) {
    this.seo.generateTags({});
    this.db.object('/seo').valueChanges().subscribe((defaultValues) => {
      if (defaultValues) {
        const tags = defaultValues['tags'] || {};
        const tagsArray = Object.keys(tags).map(key => tags[key]);

        const defaultObject = defaultValues['defaultValues'] || {};
        this.seo.updateDBDefaults(tagsArray, defaultObject);
      }
    });
  }
}
