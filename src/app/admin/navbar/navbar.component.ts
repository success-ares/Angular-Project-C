import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from './navbar.service';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';


import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './navbar.component.html',
  styleUrls: ['../admin-common-style.css', './navbar.component.css'],
  providers: [ NavbarService ]
})
export class NavbarComponent implements OnInit, OnDestroy {
  firebaseSubscription: Subscription = null;
  firebaseContactSubscription: Subscription = null;
  navbar: any;
  loading = true;
  pageTitle: string;
  contact;
  email = new FormControl('', [Validators.required, Validators.email]);
  phone = new FormControl('', [Validators.required]);
  facebook = new FormControl(null, []);
  instagram  = new FormControl(null, []);
  loadingContact = true;
  loadingNavbar = true;

  constructor(
    private router: Router,
    private ns: NavbarService,
    public translate: TranslateService,
    public snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.translate.get('admin.navbar.pageTitle').toPromise().then(pageTitle => {
      this.pageTitle = pageTitle;
    });
    this.firebaseSubscription = this.ns.getNavbar().subscribe(navbar => {
      this.navbar = navbar;
      this.loadingNavbar = false;
      this.loading = this.loadingContact;
    });
    this.firebaseContactSubscription = this.ns.getContactNavbar()
      .subscribe(contact => {
        this.contact = contact;
        this.updateContactForm(this.contact);
        this.loadingContact = false;
        this.loading = this.loadingNavbar;
      });
  }

  updateContactForm(contact): void {
    if (contact) {
      this.email.setValue(contact.email);
      this.phone.setValue(contact.phone);
      this.facebook.setValue(contact.facebook);
      this.instagram.setValue(contact.instagram);
    }
  }

  sasabha() {
    alert('sdnsdsnd');
  }
  addNewMainItem(): void {
    this.navbar = this.navbar || [];
    this.navbar.push({
      text: '',
      link: '',
      children: []
    });
  }

  save(): void {
    this.ns.saveNavber(this.navbar).then(() => {
      console.log('Saved successfully: ', this.navbar);
      this.openSnackBar('Saved Successfully', null);
    }).catch((err) => {
      this.openSnackBar('Error While Saving', null);
      console.log('Error in saving navbar: ', err);
    });
  }

  cancel(): void {
    this.router.navigate(['admin', 'homepage']);
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  saveContact(): void {
    this.contact = {
      email: this.email.value,
      phone: this.phone.value,
      facebook: this.facebook.value,
      instagram: this.instagram.value
    };
    this.ns.saveContactNavber(this.contact).then(() => {
      console.log('Saved successfully: ', this.contact);
      this.openSnackBar('Saved Successfully', null);
    }).catch((err) => {
      console.log('Error in savin navbar: ', err);
      this.openSnackBar('Error While Saving', null);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.firebaseSubscription) {
      this.firebaseSubscription.unsubscribe();
    }
    if (this.firebaseContactSubscription) {
      this.firebaseContactSubscription.unsubscribe();
    }
  }
}
