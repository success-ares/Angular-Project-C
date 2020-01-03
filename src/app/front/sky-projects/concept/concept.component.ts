import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../project.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.css'],
  providers: [ProjectService],
})
export class ConceptComponent implements OnInit, AfterViewInit, OnDestroy {
  urlSubscription: Subscription = null;
  private fragment: string;
  response: Observable<{}>;

  constructor(
    private ps: ProjectService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log('Enter');
    this.urlSubscription = this.route.fragment.subscribe(
      (fragment) => {
        this.fragment = fragment;
        this.ngAfterViewInit();
      });
    this.response = this.ps.getConcept();
  }

  ngAfterViewInit(): void {
    try {
      document.querySelector('#' + this.fragment).scrollIntoView();
    } catch (e) { }
  }

  ngOnDestroy(): void {
    if (this.urlSubscription) {
      this.urlSubscription.unsubscribe();
    }
  }
}
