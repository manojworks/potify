import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { SelectionModel} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {catchError, finalize, merge, tap, throwError} from "rxjs";
import {emptyManagerListing, ManagerListings} from "./manager-listings.model";
import {ListingsService} from "../services/listing/listing.service";
import {MatTable} from "@angular/material/table";


@Component({
  selector: 'app-manager-listings',
  templateUrl: './manager-listings.component.html',
  styleUrls: ['./manager-listings.component.css']
})

@Injectable()

export class ManagerListingsComponent implements OnInit, AfterViewInit {

  lds: ManagerListings = emptyManagerListing();
  loading = false;

  @ViewChild(MatPaginator, {static: false}) paginator :any = MatPaginator;

  // @ViewChild(MatPaginator, {static: false})
  // set paginator(value: MatPaginator) {
  //   if (this.lds){
  //     this.paginator = value;
  //   }
  // }

  @ViewChild(MatSort, {static: false}) sort: any = MatSort;
  @ViewChild(MatTable, {static: false}) listingsTable: MatTable<ManagerListings> | undefined
  selection = new SelectionModel<ManagerListings>(true, []);

  constructor(private listingService: ListingsService) {}

  displayedColumns = ['file_name', "state", 'attr'];

  ngOnInit() {

    this.listingService.getCurrentListings().subscribe(res => {
      this.lds = res
      this.listingsTable?.renderRows()
    })

    this.listingService.listRecentSongs('asc', 0, 10).subscribe();

  }

  listRecentSongs() {
    this.loading = true
    this.listingService.listRecentSongs(this.sort?.direction ?? "asc",
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 10).pipe(
      tap((listings: ManagerListings) => {
        this.listingsTable?.renderRows()
      }),
      catchError(err => {
        console.log("Error loading recent listings", err);
        alert("Error loading recent listings.");
        return throwError(err);

      }),
      finalize(() => {this.loading = false
        this.listingsTable?.renderRows()
      })
    ).subscribe(res => {
      //this.lds = res
      //this.listingsTable.paginator = this.paginator
    })
  }

  listByCategory(cat: string) {
    this.loading = true
    // TODO: add more params for sort and pagination
    this.listingService.listByCategory(cat).pipe(
      tap((listings: ManagerListings) => {
        this.listingsTable?.renderRows()
      }),
      catchError(err => {
        console.log("Error loading listings by category ", err);
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    ).subscribe()
  }

  // addASong(newSong: ManagerListing) {
  //   this.listingService.addASong(newSong)
  //   this.listingsTable?.renderRows()
  // }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.listRecentSongs())
      )
      .subscribe();
  }
}
