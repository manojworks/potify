import { Injectable } from '@angular/core';
import {ManagerListings} from "../../manager-listings/manager-listings.model";
import {Subject} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private listingsSubject = new Subject<ManagerListings>();
  listingsObservable = this.listingsSubject.asObservable();

  constructor() {

  }

  public addASong(newSong: ManagerListings) {
    this.listingsSubject.next(newSong)
  }


}
