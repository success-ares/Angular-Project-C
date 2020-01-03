import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrAddNewsComponent } from './edit-or-add-news.component';

describe('EditOrAddNewsComponent', () => {
  let component: EditOrAddNewsComponent;
  let fixture: ComponentFixture<EditOrAddNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrAddNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrAddNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
