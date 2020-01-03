import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddPressReleaseComponent } from './edit-or-add-press-release.component';

describe('EditOrAddPressReleaseComponent', () => {
  let component: EditOrAddPressReleaseComponent;
  let fixture: ComponentFixture<EditOrAddPressReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddPressReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddPressReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
