import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "src/app/services/upload-file/upload-file.service"
import {ManagerListing} from "../manager-listings/manager-listings.model";
import { Injectable } from '@angular/core';
import {ListingsService} from "../services/listing/listing.service";


export interface IUploadResponse {
  id: string,
  original_file_name: string,
  status: number,
  errors: string
}

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
  providers: [ListingsService],
})

export class FileUploaderComponent implements OnInit {

  selectedFiles: FileList | null | undefined;

  private uploadResult: IUploadResponse | undefined

  constructor(private uploadService: UploadFileService, private listingService: ListingsService) { }

  ngOnInit(): void {
  }

  fileUpload() {
    if (this.selectedFiles) {
      for (let ind = 0; ind < this.selectedFiles.length; ind++) {
        console.log(this.selectedFiles[ind])
        this.uploadService.upload(this.selectedFiles[ind]).subscribe( resp => {
            this.uploadResult = <IUploadResponse>resp
            let newSong: ManagerListing = {id: this.uploadResult.id,
                                          file_name: this.uploadResult.original_file_name,
                                          state: this.uploadResult.status,
                                          attr: []}
            this.listingService.addASong(newSong)
          }
        )
      }
    }
  }

  onFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFiles = target.files;
   }

}
