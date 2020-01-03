import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewCategoryDialogComponent } from './add-new-category-dialog.component';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialsModule } from '../../../shared/materials.module';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Observable } from "rxjs/Rx";

class MdDialogMock {
  open() {
    return {
      afterClosed: () => Observable.of([{}])
    };
  }
};

describe('AddNewCategoryDialogComponent', () => {
  let component: AddNewCategoryDialogComponent;
  let fixture: ComponentFixture<AddNewCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
       SharedModule,
      ],
      declarations: [ AddNewCategoryDialogComponent ],
      providers: [
        {useClass: MdDialogMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
