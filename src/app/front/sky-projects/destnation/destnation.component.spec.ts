import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DestnationComponent } from './destnation.component';

describe('DestnationComponent', () => {
  let component: DestnationComponent;
  let fixture: ComponentFixture<DestnationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DestnationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DestnationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
