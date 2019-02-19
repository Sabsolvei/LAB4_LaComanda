import { AngularFireList } from 'angularfire2/database';
import { FileUpload } from './../../clases/file-upload';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import * as firebase from "firebase";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UplodadFilesService {

  private basePath = '/uploads';
  private imagenCargada = new BehaviorSubject<boolean>(false);

  constructor(private db: AngularFireDatabase) { }

  get mostrarImagenCargada() {
    return this.imagenCargada.asObservable();
  }

  traerImagenCargada(dni: string) {
    return this.db
      .list("/uploads/", ref => ref.orderByChild("name").equalTo(dni))
      .valueChanges();
  }

  pushFileToStorage(fileUpload: FileUpload, progress: { percentage: number }) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('Archivo disponible en: ');
          console.log(downloadURL);
          fileUpload.url = downloadURL;
     //     fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      }
    );
  }

  private saveFileData(fileUpload: FileUpload) {
    this.db.list(`${this.basePath}/`).push(fileUpload).then(() => this.imagenCargada.next(true));
  }

  public getFileUploads(numberItems): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  public deleteFileUpload(fileUpload: FileUpload) {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete();
  }
}
