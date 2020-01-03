import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddPageComponent } from './edit-or-add-page.component';

describe('EditOrAddPageComponent', () => {
  let component: EditOrAddPageComponent;
  let fixture: ComponentFixture<EditOrAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
