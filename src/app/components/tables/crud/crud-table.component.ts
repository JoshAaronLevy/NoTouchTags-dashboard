import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Tags } from '../../../models/tag.model';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TagsService } from 'src/app/services/tags.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

declare var jsPDF: any;

@Component({
  selector: 'app-crud-table',
  templateUrl: './crud-table.component.html',
  styleUrls: ['./crud-table.component.scss'],
  providers: [MessageService, ConfirmationService, AuthService]
})
export class CrudTableComponent implements OnInit {
  currentUser: any;

  email: string;

  password: string;

  signIn: boolean = false;

  loadingTags: boolean = true;

  loadingError: boolean;

  tagDialog: boolean;

  tag: any;

  selectedTags: Tags[];

  submitted: boolean;

  statuses: any[];

  exportColumns: any[];

  tags: Tags[];

  queriedTags: any;

  ownerEmail: string = `demo@tollbrothers.com`;

  user: string;

  loggedIn: boolean;

  subscription: Subscription;

  constructor(
    private tagsService: TagsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = localStorage.getItem('user');
    // this.parseTestAll();
    if (this.currentUser !== null || this.currentUser !== undefined || this.currentUser !== '') {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    this.parseTestQuery();
  }

  parseTestAll() {
    this.tagsService.getAllTags().subscribe(results => {
      this.tags = results;
      console.log(this.tags);
    });
  }

  parseTestQuery() {
    this.currentUser = this.ownerEmail;
    this.tagsService.getQuery(this.currentUser).subscribe(results => {
      console.log(results.length);
      if (!results || results.length < 1) {
        setTimeout(() => {
          this.loadingError = true;
          this.loadingTags = false;
        }, 1500);
      } else {
        this.queriedTags = results;
        setTimeout(() => {
          this.loadingError = false;
          this.loadingTags = false;
        }, 1500);
      }
    });
  }

  openNew() {
    this.tag = {};
    this.submitted = false;
    this.tagDialog = true;
  }

  editProduct(tag: Tags) {
    this.tag = { ...tag };
    this.tagDialog = true;
  }

  deleteProduct(tag: Tags) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + tag.tagTitle + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.tags = this.tags.filter(val => val.tagId !== tag.tagId);
        this.tag = {};
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  hideDialog() {
    this.tagDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    if (this.tag.name.trim()) {
      if (this.tag.id) {
        this.tags[this.findIndexById(this.tag.id)] = this.tag;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.tag.id = this.createId();
        this.tag.image = 'tag-placeholder.svg';
        this.tags.push(this.tag);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }
      this.tags = [...this.tags];
      this.tagDialog = false;
      this.tag = {};
    }
  }

  findIndexById(tagId: string): number {
    let index = -1;
    for (let i = 0; i < this.tags.length; i++) {
      if (this.tags[i].tagId === tagId) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.tags);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "tags");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  exportPdf() {
    const doc = new jsPDF.default(0,0);
    doc.autoTable(this.exportColumns, this.tags);
    doc.save('tags.pdf');
  }
}
