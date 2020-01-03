import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditSkywalkElementComponent } from './add-or-edit-skywalk-element.component';

describe('AddOrEditSkywalkElementComponent', () => {
  let component: AddOrEditSkywalkElementComponent;
  let fixture: ComponentFixture<AddOrEditSkywalkElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditSkywalkElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditSkywalkElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
