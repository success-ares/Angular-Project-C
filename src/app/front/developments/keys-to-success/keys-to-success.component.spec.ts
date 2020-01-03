import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeysToSuccessComponent } from './keys-to-success.component';

describe('KeysToSuccessComponent', () => {
  let component: KeysToSuccessComponent;
  let fixture: ComponentFixture<KeysToSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeysToSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeysToSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
