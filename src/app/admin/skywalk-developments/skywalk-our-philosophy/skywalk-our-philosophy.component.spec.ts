import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkywalkOurPhilosophyComponent } from './skywalk-our-philosophy.component';

describe('SkywalkOurPhilosophyComponent', () => {
  let component: SkywalkOurPhilosophyComponent;
  let fixture: ComponentFixture<SkywalkOurPhilosophyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkywalkOurPhilosophyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkywalkOurPhilosophyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
