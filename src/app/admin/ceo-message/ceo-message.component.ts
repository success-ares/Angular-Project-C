import { Component, OnInit, OnDestroy } from '@angular/core';
import { CeoMessageService } from './ceo-message.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-ceo-message',
  templateUrl: './ceo-message.component.html',
  styleUrls: ['./ceo-message.component.css'],
  providers: [ CeoMessageService ]
})
export class CeoMessageComponent implements OnInit, OnDestroy {


  ceoSub: Subscription;
  ceoMessage = new FormControl(null, [Validators.required]);
  constructor(
    private ceo: CeoMessageService,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.ceoSub = this.ceo.getCeoMessage().subscribe(res => {
      this.ceoMessage.setValue(res);
    });
  }
  saveCeoMessage() {
    this.ceo.saveCeoMessage(this.ceoMessage.value).then(() => {
      this.openSnackBar('Saved successfully', '');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  ngOnDestroy(): void {
    if (this.ceoSub) {
      this.ceoSub.unsubscribe();
    }
  }
}
