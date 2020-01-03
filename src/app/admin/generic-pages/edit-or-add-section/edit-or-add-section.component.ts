import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';

import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms'; 
import { PageService } from '../page.service';

@Component({
  selector: 'app-edit-or-add-section',
  templateUrl: './edit-or-add-section.component.html',
  styleUrls: ['./edit-or-add-section.component.css'],
  providers: [PageService]

})
export class EditOrAddSectionComponent implements OnInit {
  sectionId: any;
  pageId: any;
  validSection: boolean;
  // section: any;

  regiForm: FormGroup;
  section:any;

  constructor(
    private route: ActivatedRoute,
    private ps: PageService,
    private router: Router,
    public translate: TranslateService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params['pageId'];
    this.sectionId = this.route.snapshot.params['sectionId'];
    if(this.sectionId){
      this.ps.getPageSectionById(this.pageId , this.sectionId).subscribe(res => {
        this.section = res;
        console.log(this.section);
      });
    }else{
      this.section = {
    left:{
        image:{
          imageDownloadURL:''
        }
    },
    right:{
        image:{
          imageDownloadURL:''
        },
        title: '',
        titleColor: '#ffffff',
        titleBackgroundColor: '#000000',
        paragraph: '',
        paragraphColor: '#ffffff',
        backgroundColor: '#000000'
    }
  }
    }
 
  }
}

