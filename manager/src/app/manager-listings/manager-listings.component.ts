import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

export interface SongDetails {
  title: string;
  status: number;
  attributes: string;
}

const ELEMENT_DATA: SongDetails[] = [
  {title: 'Hydrogen', status: 1.0079, attributes: 'H'},
  {title: 'Helium', status: 4.0026, attributes: 'He'},
  {title: 'Lithium', status: 6.941, attributes: 'Li'},
  {title: 'Beryllium', status: 9.0122, attributes: 'Be'},
  {title: 'Boron', status: 10.811, attributes: 'B'},
  {title: 'Carbon', status: 12.0107, attributes: 'C'},
  {title: 'Nitrogen', status: 14.0067, attributes: 'N'},
  {title: 'Oxygen', status: 15.9994, attributes: 'O'},
  {title: 'Fluorine', status: 18.9984, attributes: 'F'},
  {title: 'Neon', status: 20.1797, attributes: 'Ne'},
];

@Component({
  selector: 'app-manager-listings',
  templateUrl: './manager-listings.component.html',
  styleUrls: ['./manager-listings.component.css']
})
export class ManagerListingsComponent implements OnInit {

  displayedColumns: string[] = ['select', 'title', 'status', 'attributes'];
  dataSource = new MatTableDataSource<SongDetails>(ELEMENT_DATA);
  selection = new SelectionModel<SongDetails>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: SongDetails): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.title + 1}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
