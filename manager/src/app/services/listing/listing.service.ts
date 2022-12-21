import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {emptyManagerListing, ManagerListing} from "../../manager-listings/manager-listings.model";

@Injectable()
export class ListingsService {

  private listingsSubject = new BehaviorSubject<ManagerListing[]>([]);
  emptyListing = emptyManagerListing()

  private baseUrl = 'http://10.0.0.71/listings/';

  constructor(private http:HttpClient) {
    this.listingsSubject.next([emptyManagerListing()])
  }

  getCurrentListings() : Observable<ManagerListing[]> {
    return this.listingsSubject.asObservable();
  }

  connect(): Observable<ManagerListing[]> {
    return this.listingsSubject.asObservable();
  }

  disconnect(): void {
    this.listingsSubject.complete();
  }

  listRecentSongs(filter = '', sortOrder = 'asc',
                  pageNumber = 0, pageSize = 3): Observable<any> {
    let recentURL = this.baseUrl + "recent/"
    return this.http.get(recentURL, {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    })
      .pipe(
        map(res => {
          // @ts-ignore
          return this.listingsSubject.next(res['recent'])}),
          catchError(err => { console.log("error listing service recent", err)
          throw err
        })
      );
  }

  listByCategory(cat: string, filter: string = '',
                 sortDirection: string = 'asc', pageIndex: number = 0, pageSize: number = 3): Observable<any> {
    let byCatURL = this.baseUrl + "category/" + cat + "/"
    return this.http.get(byCatURL)
      .pipe(
        map(res => {
          // @ts-ignore
          return this.listingsSubject.next(res['category'])}),
          catchError(err => { console.log("error listing service recent", err)
          throw err
        })
      );
  }

  public addASong(newSong: ManagerListing) {
    return this.listingsSubject.next([newSong])
  }

}
