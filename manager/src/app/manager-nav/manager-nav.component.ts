import { Component, Injectable, OnInit} from '@angular/core';
import {ListingsService} from "../services/listing/listing.service";
import {ManagerListingsComponent} from "../manager-listings/manager-listings.component";

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css'],
  providers: [ManagerListingsComponent]
})
@Injectable()
export class ManagerNavComponent implements OnInit {

  private listingsComp: ManagerListingsComponent;
  constructor(private listingService: ListingsService) {
    this.listingsComp = new ManagerListingsComponent(this.listingService)
  }

  ngOnInit(): void {
    console.log("On page init left nav")

  }

  listRecentSongs() {
    console.log("nav recent ")
    // @ts-ignore
    this.listingsComp.listRecentSongs()
  }

  listByCategory(cat: string) {
    console.log("nav category")
    // @ts-ignore
    this.listingsComp.listByCategory(cat)
  }
}
