import { FileUpload } from './../../../clases/file-upload';
import { UplodadFilesService } from './../../../providers/uploadFiles/uplodad-files.service';
import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {

  public fileUploads: any[];
  @Input() public dni: string;
  imagenCargada$: Observable<boolean>;

  constructor(private uploadService: UplodadFilesService) {
  }

  ngOnInit() {
    this.imagenCargada$ = this.uploadService.mostrarImagenCargada;

    this.imagenCargada$.subscribe(() => {
      this.uploadService.traerImagenCargada(this.dni).subscribe(data => {
        console.log("DNI");
        console.log(this.dni);
        this.fileUploads = data;
      });
    });

    // this.uploadService.getFileUploads(1).snapshotChanges().pipe(
    //   map(changes =>
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
    // });

  }


}
