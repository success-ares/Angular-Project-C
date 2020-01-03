import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ContactService } from './contact.service';
import { MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { MatDialog } from '@angular/material';

import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: 'contact.component.html',
  styleUrls: ['../admin-common-style.css', './contact.component.css'],
  providers: [ ContactService ]
})
export class ContactComponent implements OnInit, OnDestroy {
  firebaseInfoSub: Subscription;
  displayedColumns = ['name', 'email', 'date'];
  dataSource = new MatTableDataSource();
  firebaseSubscription: Subscription = null;
  contact = <any>{};
  addressTitle = '';
  addressText = '';
  addressPhoneNumber = '';
  openPanel = false;
  loading = true;
  pageTitle: string;

  contactLocation = new FormGroup({
    latitude: new FormControl('', [Validators.required]),
    longitude: new FormControl('', [Validators.required])
  });
  address = new FormControl('', [Validators.required]);
  constructor(
    public cs: ContactService,
    private router: Router,
    public translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translate.get('admin.contact.pageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.firebaseSubscription = this.cs.getContact().subscribe(contact => {
      this.dataSource.data = contact;
    });
    this.firebaseInfoSub = this.cs.getContactInfo().subscribe((res: any) => {
      this.contactLocation.get('latitude').setValue(res.location.latitude);
      this.contactLocation.get('longitude').setValue(res.location.longitude);
      this.address.setValue(res.address);
      this.loading = false;
    });
  }
  contactDetails(contact) {
    this.dialog.open(ContactModalComponent, {
      data: contact
    });
  }
  saveContact(){
    const contact = {
      address: this.address.value,
      location:{
        longitude: this.contactLocation.get('longitude').value,
        latitude: this.contactLocation.get('latitude').value
      }
    }
    this.cs.saveContactInfo(contact).then(() => {
      console.log('saved');
    })
  }
  validContact(){
    return  this.contactLocation.get('longitude').valid &&
    this.contactLocation.get('longitude').valid &&
    this.address.valid;
  }
  ngOnDestroy(): void {
    if (this.firebaseSubscription) {
      this.firebaseSubscription.unsubscribe();
    }
    if (this.firebaseInfoSub) {
      this.firebaseInfoSub.unsubscribe();
    }
  }
}
