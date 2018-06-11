import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Speech } from '../feature-shell.config';
import { AddEditSpeechComponent } from '../add-edit-speech/add-edit-speech.component';
import { Router } from '@angular/router';
import { FeatureShellService } from '../feature-shell.service';
declare var $;

@Component({
  selector: 'app-list-speech',
  templateUrl: './list-speech.component.html',
  styleUrls: ['./list-speech.component.scss']
})
export class ListSpeechComponent implements AfterViewInit {

  tooltipBefore = 'before';
  tooltipAfter = 'after';
  selectedSpeech: Speech;
  authorDropDown: { values: any; selected: string; };
  dropdownData: any;
  filterArray: any[];
  searchFilterValue = '';
  displayedColumns = ['id', 'title', 'author', 'date', 'action'];
  dataSource: MatTableDataSource<Speech>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteModal') deleteModal;
  @ViewChild(AddEditSpeechComponent) addEditModal: AddEditSpeechComponent;
  public id = 1;
  tableData: Speech[];

  constructor(public router: Router, public featureService: FeatureShellService) {
    this.getAllSpeeches();
    this.dataSource = new MatTableDataSource(this.tableData);
    this.renderDataTable(this.tableData, false);
    this.createDropdowns();
  }

  getAllSpeeches() {
    this.featureService.getSpeeches().subscribe(result => {
      this.tableData = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    this.dataSource.filter = JSON.stringify(this.filterArray);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setFilterPredicate() {
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const globalSearchValue = this.searchFilterValue;
      const filters = JSON.parse(filtersJson);
      const /** @type {?} */ accumulator = function (currentTerm, key) { return currentTerm + data[key]; };
      const /** @type {?} */ dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const /** @type {?} */ transformedFilter = globalSearchValue.trim().toLowerCase();
      const hasGlobalSearch = dataStr.indexOf(transformedFilter) !== -1;

      if (hasGlobalSearch) {
        const matchFilter = [];
        filters.forEach(filter => {
          let val = data[filter.columnId] === null ? '' : data[filter.columnId];
          val = val.toString();
          matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
        });
        return matchFilter.every(Boolean);
      } else {
        return hasGlobalSearch;
      }
    };
  }

  initializeFilterArray(keepFilter) {
    if (!keepFilter) {
      this.filterArray = [
        { columnId: 'title', value: '' },
        { columnId: 'author', value: '' }
      ];
    }
  }

  resetFilters() {
    this.searchFilterValue = '';
    this.renderDataTable(this.tableData, false);
  }

  renderDataTable(tableData, keepFilter) {
    this.dataSource = new MatTableDataSource(tableData);
    this.initializeFilterArray(keepFilter);
    this.setFilterPredicate();
    this.dataSource.filter = JSON.stringify(this.filterArray);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortTable(searchValue, uniqueId) {
    this.filterArray.forEach(filter => {
      if (filter.columnId === uniqueId) {
        filter.value = searchValue;
        if (uniqueId === 'author') {
          this.authorDropDown.selected = filter.value;
        }
      }
    });
    this.dataSource.filter = JSON.stringify(this.filterArray);
  }

  uniqueValues(arr) {
    const unique = arr.filter(function (item, i, ar) { return ar.indexOf(item) === i; });
    return unique;
  }

  createDropdowns() {
    const singlePropertyArray = [];
    this.tableData.forEach(ele => {
      singlePropertyArray.push(ele['author']);
    });
    this.authorDropDown = {
      values: this.uniqueValues(singlePropertyArray),
      selected: ''
    };
  }

  openActionModal(event, row) {
    this.selectedSpeech = row;
    $('#addEditModal').modal('show');
  }

  closeActionModal(message) {
    $('#addEditModal').modal('hide');
    this.selectedSpeech = null;
    if (message !== 'true') {

      this.getAllSpeeches();
      this.createDropdowns();
      this.renderDataTable(this.tableData, false);
      setTimeout(function () {
        alert(message);
      }, 100);
    }
    this.addEditModal.createAddEditForm();
  }

  deleteWarningModal(event, row) {
    this.selectedSpeech = row;
    $('#deleteModal').modal('show');
  }

  deleteSpeech() {
    let message = '';
    this.featureService.deleteSpeech(this.selectedSpeech.id).subscribe(result => {
      message = result;
      $('#deleteModal').modal('hide');
      this.selectedSpeech = null;
      this.getAllSpeeches();
      this.renderDataTable(this.tableData, false);
    });
    setTimeout(function () {
      alert(message);
    }, 100);
  }

  cancelDelete() {
    // this.deleteModal.nativeElement.className = 'modal hide';
    $('#deleteModal').modal('hide');
  }

  goToSpeech(event, id) {
    this.router.navigate(["speeches/detail", id]);
  }

}
