import { map } from 'rxjs';
import { TableService } from './../../services/table.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  getPersonList$ = this.tableService.getPersonList$.pipe(
    map((persons) => {
      this.persons = persons;
    })
  );
  searchName: string = '';
  persons: any[] = [];
  constructor(private tableService: TableService) {}

  ngOnInit(): void {}

  /**
   * It will set the person name to request
   */
  onSearchChange() {
    this.tableService.setPersonsListBySearchRequest(this.searchName);
  }
}
