import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Speech } from '../feature-shell.config';
import { SPEECHES } from '../../shared/mock-data';
declare var $;

@Component({
  selector: 'app-list-speech',
  templateUrl: './list-speech.component.html',
  styleUrls: ['./list-speech.component.scss']
})
export class ListSpeechComponent implements AfterViewInit {

  selectedSpeech: any;
  speechToDelete: any;
  deleteSpeechTitle: string;
  authorDropDown: { values: any; selected: string; };
  dropdownData: any;
  filterArray: any[];
  searchFilterValue = '';
  displayedColumns = ['id', 'title', 'author', 'date', 'action'];
  dataSource: MatTableDataSource<Speech>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('deleteModal') deleteModal;
  public id = 1;
  tableData = SPEECHES;

  constructor() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.renderDataTable(this.tableData, false);
    this.createDropdowns();
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

  editSpeech(event, row) {
    // drftgfv
  }

  addSpeech() {
    // dfdv
  }

  deleteWarningModal(event, row) {
    this.selectedSpeech = row;
    // this.deleteModal.nativeElement.className = 'modal fade show';
    $('#deleteModal').modal('show');
  }

  deleteSpeech() {
    const totalRows = this.tableData.length;
    let index = -1;
    for (let i = 0; i < totalRows; i++) {
      if (this.tableData[i].id === this.selectedSpeech.id) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.tableData.splice(index, 1);
    }
    this.renderDataTable(this.tableData, true);
    // this.deleteModal.nativeElement.className = 'modal hide';
    $('#deleteModal').modal('hide');
  }

  cancelDelete() {
    // this.deleteModal.nativeElement.className = 'modal hide';
    $('#deleteModal').modal('hide');
  }

}
