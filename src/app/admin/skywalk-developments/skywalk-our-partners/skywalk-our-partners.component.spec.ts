import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkOurPartnersComponent } from './skywalk-our-partners.component';

describe('SkywalkOurPartnersComponent', () => {
  let component: SkywalkOurPartnersComponent;
  let fixture: ComponentFixture<SkywalkOurPartnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkOurPartnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkOurPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
