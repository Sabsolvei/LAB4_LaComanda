import { UplodadFilesService } from './../../../providers/uploadFiles/uplodad-files.service';
import { FileUpload } from './../../../clases/file-upload';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upload-files-form',
  templateUrl: './upload-files-form.component.html',
  styleUrls: ['./upload-files-form.component.scss']
})
export class UploadFilesFormComponent implements OnInit {

  @Input() dni: string;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
 
  constructor(private uploadService: UplodadFilesService) { }
 
  ngOnInit() {
  }
 
  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.upload();
  }
 
  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
 
    this.currentFileUpload = new FileUpload(file);
    this.currentFileUpload.name = this.dni;
    this.currentFileUpload.originalName = file.name;
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress);
  }

}
