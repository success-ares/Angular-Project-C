import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CeoMessagePageComponent } from './ceo-message-page.component';

describe('CeoMessagePageComponent', () => {
  let component: CeoMessagePageComponent;
  let fixture: ComponentFixture<CeoMessagePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CeoMessagePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CeoMessagePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
