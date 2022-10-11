import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();
    formData.append('file', file)
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: false,
      responseType: 'json'
    });

    return this.http.request(req)
  }
}
