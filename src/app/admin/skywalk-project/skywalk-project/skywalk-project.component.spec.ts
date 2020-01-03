import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkProjectComponent } from './skywalk-project.component';

describe('SkywalkProjectComponent', () => {
  let component: SkywalkProjectComponent;
  let fixture: ComponentFixture<SkywalkProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
