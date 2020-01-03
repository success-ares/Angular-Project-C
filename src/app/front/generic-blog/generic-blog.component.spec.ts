import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBlogComponent } from './generic-blog.component';

describe('GenericBlogComponent', () => {
  let component: GenericBlogComponent;
  let fixture: ComponentFixture<GenericBlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericBlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
