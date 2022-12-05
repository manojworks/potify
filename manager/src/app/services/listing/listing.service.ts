import { Injectable } from '@angular/core';
import {ManagerListings} from "../../manager-listings/manager-listings.model";
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class ListingService {

  private baseUrl = 'http://10.0.0.71/listings/recent/';

  private listingsSubject = new Subject<ManagerListings>();
  listingsObservable = this.listingsSubject.asObservable();

  constructor(private http: HttpClient) {

  }

  public addASong(newSong: ManagerListings) {
    this.listingsSubject.next(newSong)
  }

  public listRecent(): Observable<ManagerListings[]> {
    return this.http.get<ManagerListings[]>(this.baseUrl)
  }
}
