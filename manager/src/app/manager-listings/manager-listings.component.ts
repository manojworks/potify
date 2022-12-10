import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {ManagerListings} from "./manager-listings.model";
import {ListingService} from "../services/listing/listing.service";
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-manager-listings',
  templateUrl: './manager-listings.component.html',
  styleUrls: ['./manager-listings.component.css']
})

export class ManagerListingsComponent implements OnInit {

  displayedColumns: string[] = ['song_id', 'file_name', 'song_status', 'attributes'];
  dataSource : MatTableDataSource<ManagerListings>;
  selection = new SelectionModel<ManagerListings>(true, []);
  @ViewChild('paginator') paginator: MatPaginator | undefined;

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

    console.log("On page init listings component ")
    this.listingService.listRecent().subscribe(listingsData => {
      const newData = [ ...this.dataSource.data ];
      for (let key in listingsData){
        let entry = listingsData[key]
        let newEntry = new ManagerListings(entry['song_id'], entry['file_name'], entry['song_status'], entry['attributes'])
        newData.push(newEntry);
      }
        this.dataSource.data = newData
      })




    this.listingService.listingsObservable.subscribe(newManagerListing => {
      console.log("On page init subscribe observable")
      let newEntry = new ManagerListings(newManagerListing.getSongId(), newManagerListing.getSongFileName(), 1, newManagerListing.getSongAttributes())
      const newData = [ ...this.dataSource.data ];
      newData.push(newEntry);
      this.dataSource.data = newData;
    })
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator
  }

}
