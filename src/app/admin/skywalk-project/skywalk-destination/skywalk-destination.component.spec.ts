import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkDestinationComponent } from './skywalk-destination.component';

describe('SkywalkDestinationComponent', () => {
  let component: SkywalkDestinationComponent;
  let fixture: ComponentFixture<SkywalkDestinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkDestinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
