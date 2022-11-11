import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ManagerListings} from "./manager-listings.model";
import {ListingService} from "../services/listing/listing.service";



@Component({
  selector: 'app-manager-listings',
  templateUrl: './manager-listings.component.html',
  styleUrls: ['./manager-listings.component.css']
})

export class ManagerListingsComponent implements OnInit {

  displayedColumns: string[] = ['song_id', 'file_name', 'song_status', 'attributes'];
  dataSource : MatTableDataSource<ManagerListings>;
  selection = new SelectionModel<ManagerListings>(true, []);

  constructor(private listingService: ListingService, private changeDetectorRefs: ChangeDetectorRef) {
    this.dataSource = new MatTableDataSource<ManagerListings>();
  }

  addASong(newSong: ManagerListings) {
    this.listingService.addASong(newSong)
    this.changeDetectorRefs.detectChanges();
  }
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
  checkboxLabel(row?: ManagerListings): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.getSongId() + 1}`;
  }



  ngOnInit(): void {
    this.listingService.listingsObservable.subscribe(newManagerListing => {
      let newEntry = new ManagerListings(newManagerListing.getSongId(), newManagerListing.getSongFileName(), 1, newManagerListing.getSongAttributes())
      const newData = [ ...this.dataSource.data ];
      newData.push(newEntry);
      this.dataSource.data = newData;
    })
  }

}
