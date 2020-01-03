import { Component, OnInit } from '@angular/core';
import { DevelopmentService } from "../development.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-keys-to-success',
  templateUrl: './keys-to-success.component.html',
  styleUrls: ['./keys-to-success.component.css'],
  providers: [DevelopmentService]

})
export class KeysToSuccessComponent implements OnInit {
  response: Observable<{}>;

  constructor(
    private ds:DevelopmentService
  ) { }

  ngOnInit() {
    this.response = this.ds.getKeysToSuccess();
  }

}
