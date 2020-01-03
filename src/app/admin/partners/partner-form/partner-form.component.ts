import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';

@Component({
  templateUrl: './partner-form.component.html',
  styleUrls: ['./partner-form.component.css'],
})

export class PartnerFormComponent implements OnInit {
  logo: any;
  title = 'New Partner Logo';
  action = 'Add';
  editing = false;
  constructor(
    public dialogRef: MatDialogRef<PartnerFormComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(
  ) {
    this.logo = { link: '', newTab: true, imageDownloadURL: '' };
    if (this.data.logo && this.data.logo.imageDownloadURL) {
      this.logo = Object.assign(this.logo, this.data.logo);
      console.log(this.logo);
      this.title = 'Edit Partner Logo';
      this.action = 'Edit';
      this.editing = true;
    }
  }

  uploadPartnersLogo(img) {
    if (img && typeof (img) === 'object') {
      this.logo = Object.assign(this.logo, img);
      console.log(this.logo, img);
    }
  }


  submitLogo() {
    if (this.logo.imageDownloadURL && this.logo.imageDownloadURL.length > 0 && this.editing) {
      this.dialogRef.close({
        editing: this.editing,
        old: this.data.logo,
        new: this.logo,
        index: this.data.index,
      });
    } else if (this.logo.imageDownloadURL && this.logo.imageDownloadURL.length > 0 && !this.editing) {
      this.dialogRef.close({
        editing: this.editing,
        old: null,
        new: this.logo,
      });
    } else {
      this.snackBar.open('please provide valid data.', 'X', { duration: 2000 });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
