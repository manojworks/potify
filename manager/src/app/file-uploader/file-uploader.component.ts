import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "src/app/services/upload-file/upload-file.service"

export interface IUploadResponse {
  original_file_name: string,
  saved_path: string,
  errors: string
}

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})

export class FileUploaderComponent implements OnInit {

  selectedFiles: FileList | null | undefined;

  private uploadResult: IUploadResponse | undefined

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  fileUpload() {
    if (this.selectedFiles) {
      for (var ind = 0; ind < this.selectedFiles.length; ind++) {
        console.log(this.selectedFiles[ind])
        this.uploadService.upload(this.selectedFiles[ind]).subscribe( resp => {
            this.uploadResult = <IUploadResponse>resp
            console.log("path is " + this.uploadResult.saved_path)
            console.log(" original fule is " + this.uploadResult.original_file_name)
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
