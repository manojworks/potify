import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "src/app/services/upload-file/upload-file.service"
import {ManagerListings} from "../manager-listings/manager-listings.model";
import {ManagerListingsComponent} from "../manager-listings/manager-listings.component";
import { Injectable } from '@angular/core';


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
  providers: [ManagerListingsComponent],
})

export class FileUploaderComponent implements OnInit {

  selectedFiles: FileList | null | undefined;

  private uploadResult: IUploadResponse | undefined

  constructor(private uploadService: UploadFileService, private listingComponent: ManagerListingsComponent) { }

  ngOnInit(): void {
  }

  fileUpload() {
    if (this.selectedFiles) {
      for (var ind = 0; ind < this.selectedFiles.length; ind++) {
        console.log(this.selectedFiles[ind])
        this.uploadService.upload(this.selectedFiles[ind]).subscribe( resp => {
            this.uploadResult = <IUploadResponse>resp
            let newSong = new ManagerListings(this.uploadResult.id, this.uploadResult.original_file_name, this.uploadResult.status, <string[]>[])
            this.listingComponent.addASong(newSong)
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
