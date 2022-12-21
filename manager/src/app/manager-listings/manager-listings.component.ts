import {AfterViewInit, Component, Injectable, OnInit, ViewChild} from '@angular/core';
import { SelectionModel} from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {catchError, finalize, merge, tap, throwError} from "rxjs";
import {ManagerListing} from "./manager-listings.model";
import {ListingsService} from "../services/listing/listing.service";
import {MatTable} from "@angular/material/table";


@Component({
  selector: 'app-manager-listings',
  templateUrl: './manager-listings.component.html',
  styleUrls: ['./manager-listings.component.css'],
  providers: [ManagerListingsComponent]
})

@Injectable()

export class ManagerListingsComponent implements OnInit, AfterViewInit {

  lds: ManagerListing[] = [];
  loading = false;

  @ViewChild(MatPaginator) paginator :any = MatPaginator;

  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatTable, {static: false}) listingsTable: MatTable<ManagerListing> | undefined
  selection = new SelectionModel<ManagerListing>(true, []);

  constructor(private listingService: ListingsService) {}

  displayedColumns = ['file_name', "state", 'attr'];

  ngOnInit() {

    this.listingService.getCurrentListings().subscribe(res => {
      this.lds = res
      this.listingsTable?.renderRows()
    })

    this.listingService.listRecentSongs('', 'asc', 0, 3).subscribe();

  }

  listRecentSongs() {
    this.loading = true
    this.listingService.listRecentSongs().pipe(
      tap((listings: ManagerListing[]) => {
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
    ).subscribe(res => this.lds = res)
  }

  listByCategory(cat: string) {
    this.loading = true
    this.listingService.listByCategory(cat).pipe(
      tap((listings: ManagerListing[]) => {
        this.listingsTable?.renderRows()
      }),
      catchError(err => {
        console.log("Error loading listings by category ", err);
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    ).subscribe()
  }

  addASong(newSong: ManagerListing) {
    this.listingService.addASong(newSong)
    this.listingsTable?.renderRows()
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.listRecentSongs())
      )
      .subscribe();
  }
}
