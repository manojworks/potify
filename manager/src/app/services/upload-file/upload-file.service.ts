import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://10.0.0.71/song-upload/api';

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('file', file)
    return this.http.post(this.baseUrl, formData)
  }
}
