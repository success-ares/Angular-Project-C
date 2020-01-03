import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkElementsComponent } from './skywalk-elements.component';

describe('SkywalkElementsComponent', () => {
  let component: SkywalkElementsComponent;
  let fixture: ComponentFixture<SkywalkElementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkElementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
