import {Component, OnInit} from '@angular/core';
import {UploadFileService} from "src/app/services/upload-file/upload-file.service"

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  selectedFiles: FileList | null | undefined;
  // private subscription: Subscription | undefined

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  fileUpload() {
    if (this.selectedFiles) {
      console.log('num files ' + this.selectedFiles.length)
      for (var ind = 0; ind < this.selectedFiles.length; ind++) {
        console.log(this.selectedFiles[ind])
        this.uploadService.upload(this.selectedFiles[ind]).subscribe(

        )
      }
    }
  }

  onFileInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFiles = target.files;
   }

}
