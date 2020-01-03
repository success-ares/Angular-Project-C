import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {PartnersService} from './partners.service';
import {Subscription} from 'rxjs/Subscription';
import {MatSnackBar, MatDialog} from '@angular/material';
import {UploadService} from '../../shared/services/upload.service';
import {TranslateService} from '@ngx-translate/core';
import { PartnerFormComponent } from './partner-form/partner-form.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css'],
  providers: [PartnersService]
})
export class PartnersComponent implements OnInit, OnDestroy {
  partners: any[];
  partnersFirebaseSub: Subscription;
  loading = true;
  pageTitle: any;
  successMessage: any;
  errMessage: any;

  constructor(
    private ps: PartnersService,
    public snackBar: MatSnackBar,
    public translate: TranslateService,
    private uploadService: UploadService,
    public dialog: MatDialog,
  ) {
    this.translate.setDefaultLang('en');
    this.getTranslatePage();
  }

  ngOnInit() {
    this.translate.get('admin.Partners.PageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.partnersFirebaseSub = this.ps.getOurPartners().subscribe(res => {
      this.partners = res;
    });
    this.loading = false;
  }
  getTranslatePage() {
    this.translate.get('general.successMessage').subscribe(res => {
      this.successMessage = res;
    });
    this.translate.get('general.errorMessage').subscribe(res => {
      this.errMessage = res;
    });
  }
  deletePartner(p) {
    this.partners = this.partners.filter((ele) => ele.key !== p.key);
  }
  movePartner(direction , p) {
    const index = this.partners.indexOf(p);
    if (direction === 'left') {
      const temp = this.partners[index];
      this.partners[index] = this.partners[index - 1];
      this.partners[index - 1] = temp;
    } else {
      const temp = this.partners[index];
      this.partners[index] = this.partners[index + 1];
      this.partners[index + 1] = temp;
    }
  }
  savePartners() {
    this.ps.saveOurPartners(this.partners).then(() => {
      this.openSnackBar('Saved successfully');
    });
  }
  uploadPartnersLogo(img) {
    this.partners.push(img);
  }

  /**
   * Function to open the Partner Logo form dialog, and handle the after-close logic
   * @param index - (optional) current index of the logo in the array of logos
   * @param logo - (optional) logo to be edited if not adding a new logo
   */
  openPartnerForm(index = 0, logo?) {
    let logoCopy = null;
    if (logo) {
      // Immutable copy
      logoCopy = Object.assign({}, logo);
    }
    const dialogRef = this.dialog.open(PartnerFormComponent, {
      width: '400px',
      data: {
        logo: logoCopy,
        index,
      }
    });

    // Handle Dialog Result
    const closeSubscription = dialogRef.afterClosed().subscribe((dialogRes) => {
      console.log(dialogRes);
      // Check if Dialog wasn't cancelled & the new data to be saved is available
      if (dialogRes && dialogRes.new && dialogRes.new.imageDownloadURL && dialogRes.new.imageDownloadURL.length > 0) {
        if (dialogRes.editing) {
          // Replace item being edited in the array
          if (dialogRes.index >= 0) {
            this.partners[dialogRes.index] = dialogRes.new;
          } else {
            this.openSnackBar('Error Saving Changes, Please Try again');
          }
        } else {
          // Add new Item to array
          this.partners.push(dialogRes.new);
        }
      }
      closeSubscription.unsubscribe();
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
    });
  }

  ngOnDestroy() {
  }
}
