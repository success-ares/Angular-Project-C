import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../page.service';
import {TranslateService} from '@ngx-translate/core';
import {UploadService} from '../../../shared/services/upload.service';
import {MatSnackBar, MatTableDataSource, MatPaginator, PageEvent} from '@angular/material';

@Component({
  selector: 'app-edit-or-add-page',
  templateUrl: './edit-or-add-page.component.html',
  styleUrls: ['./edit-or-add-page.component.css'],
  providers: [PageService]
})
export class EditOrAddPageComponent implements OnInit, OnDestroy, AfterViewInit {
  sectionId: any;
  firebaseSectionsSubscription: Subscription;
  sections: any;
  page: any;
  firebasePageSubscription: Subscription = null;
  pageTitleFrom = new FormControl('', [Validators.required]);
  pageLinkFrom = new FormControl('', [Validators.required]);

  isNew: boolean;
  pageId: string = null;
  pageTitle: string;
  loading = true;

  pageEvent = new PageEvent();
  pageIndex = 0;
  pageSize = 5;

  @ViewChild('choosePagePhotoElement')
  private choosePageImageElementRef: ElementRef;
  displayedColumns = ['pageTitle', 'link', 'move', 'edit', 'delete'];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route: ActivatedRoute,
              public pageService: PageService,
              private router: Router,
              public translate: TranslateService,
              private uploadService: UploadService,
              private snackBar: MatSnackBar,
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.pageId = this.route.snapshot.params['pageId'];
    if (this.pageId) {
      this.firebaseSectionsSubscription = this.pageService.getPageSectionsList(this.pageId).subscribe(res => {
        this.dataSource.data = res;
        this.sections = res;
        this.fixedSectionDataLinkAndOrder();
      });
      this.isNew = false;
      this.translate.get('admin.genericPages.page.editPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.firebasePageSubscription = this.pageService.getPageById(this.pageId)
        .subscribe(page => {
          this.page = page;
          this.updateFrom();
          this.loading = false;
        });
    } else {
      this.translate.get('admin.genericPages.page.newPageTitle')
        .toPromise()
        .then(pageTitle => {
          this.pageTitle = pageTitle;
        });
      this.isNew = true;
      this.loading = false;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  updateFrom() {
    if (this.page) {
      this.pageTitleFrom.setValue(this.page.title);
      this.pageLinkFrom.setValue(this.page.link);
    }
  }

  invalidForm(): boolean {
    return (this.pageLinkFrom.invalid
      || this.pageTitleFrom.invalid );
  }

  savePage(): void {
    this.page = {
      title: this.pageTitleFrom.value,
      link: this.pageLinkFrom.value,
    };
    this.pageService.checkIfLinkTakenByAnotherPage(this.page.link, this.pageId)
      .then((value) => {
        if (value === true) {
          this.openSnackBar('Error this link already taken by another page', 'X');
        } else {
          if (this.isNew) {
            this.pageService.addPage(this.page)
              .then(() => {
                console.log('Added successfully: ', this.page);
                this.router.navigate(['/admin/genericPages']);
              });
          } else {
            this.page.key = this.pageId;
            this.pageService.updatePage(this.page)
              .then(() => {
                console.log('Updated successfully: ', this.page);
                this.router.navigate(['/admin/genericPages']);
              }).catch(err => {
              console.log('Failed to Update with Error:', err);
            });
          }
        }
      });
  }

  deleteSection(section) {
    console.log('delete');
    const res = confirm(`Are you sure you want to delete ${section.right.title}`);
    if (res) {
      this.pageService.deleteSection(this.pageId, section.key).then(() => {
        console.log('deleted');
        this.updateAllSectionsOrder();
      });
    }
  }

  fixedSectionDataLinkAndOrder() {
    let needToFix = false;
    Object(this.sections).forEach(section => {
      console.log(section.right.order);
      console.log(section.right.link);
      console.log(section);
      if (section.right.order ===  undefined || section.right.link ===  undefined) {
        needToFix = true;
      }
    });
    console.log(needToFix);
    if (needToFix) {
      for (let i = 0; i < this.sections.length; i++) {
        if (this.sections[i].right.link === undefined) {
          this.sections[i].right = {link: i, order: i, ...this.sections[i].right};
        } else {
          this.sections[i].right = {order: i, ...this.sections[i].right};
        }
      }
      this.save();
    }
  }

  updateAllSectionsOrder(): void {
    for (let i = 0; i < this.sections.length; i++) {
      this.sections[i].right.order = i;
    }
    this.save();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getRowIndex(rowPageIndex: number): number {
    return (this.pageEvent.pageSize * this.pageEvent.pageIndex) + rowPageIndex;
  }

  move(index: number, up: boolean): void {
    const operand = up ? -1 : 1;
    const temp = this.sections[index];
    this.sections[index] = this.sections[index + operand];
    this.sections[index + operand] = temp;
    this.sections[index + operand].right.order = index + operand;
    this.sections[index].right.order = index;
    console.log(this.sections);
    this.dataSource._updateChangeSubscription();
  }

  save(): void {
    this.pageService.updatePageSectionsList(this.pageId, this.sections);
    console.log('saved');
  }

  ngOnDestroy(): void {
    if (this.firebasePageSubscription) {
      this.firebasePageSubscription.unsubscribe();
    }
    if (this.firebaseSectionsSubscription) {
      this.firebaseSectionsSubscription.unsubscribe();
    }
  }
}
