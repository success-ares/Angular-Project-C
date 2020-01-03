import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs/observable/timer';

@Component({
  selector: 'app-shared-contact-us-form',
  templateUrl: './shared-contact-us-form.component.html',
  styleUrls: ['./shared-contact-us-form.component.css'],
  providers: [ContactService]
})
export class SharedContactUsFormComponent implements OnInit {

  message: string;
    contactForm = new FormGroup ({
        name: new FormControl('' , [Validators.required]),
        email: new FormControl('' , [Validators.required]),
        feedback: new FormControl('' , [Validators.required]),
    });


    constructor(
    private cs: ContactService,
    public snackBar: MatSnackBar
  ) { }


  sendMessage(formDir) {
    console.log("send message");
    
    this.message = '';
    this.contactForm.value.date = Date.now();
    console.log(this.contactForm.value);
    console.log();
    this.cs.sendToContact(this.contactForm.value).then( () => {
      setTimeout(() => {
        this.message = '';
      }, 3000);
      this.message = 'Feed back send successfully';
    //   this.snackBar.open('Feed back send successfully', '', {
    //   duration: 2000,
    // });
      this.contactForm.reset();
      console.log(formDir);
      formDir.resetForm();
    });
  }

  ngOnInit() {
  }

}
