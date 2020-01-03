import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CareersPageComponent } from '../careers-page/careers-page.component';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-new-category-dialog',
  templateUrl: './add-new-category-dialog.component.html',
  styleUrls: ['./add-new-category-dialog.component.css']
})
export class AddNewCategoryDialogComponent {
  categoryNameFrom = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<CareersPageComponent>,
  ) { }

  addNewCategory(): void {
    console.log(this.categoryNameFrom.value);
    this.dialogRef.close(this.categoryNameFrom.value);
  }
}
