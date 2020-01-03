import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddEventComponent } from './edit-or-add-event.component';

describe('EditOrAddEventComponent', () => {
  let component: EditOrAddEventComponent;
  let fixture: ComponentFixture<EditOrAddEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
