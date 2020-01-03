import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersPageComponent } from './careers-page.component';
import { SharedModule } from "../../../shared/shared.module";
import { RouterModule } from "@angular/router";

describe('CareersPageComponent', () => {
  let component: CareersPageComponent;
  let fixture: ComponentFixture<CareersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterModule,
      ],
      declarations: [ CareersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
