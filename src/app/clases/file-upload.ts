export class FileUpload {

    key: string;
    name: string;
    url: string;
    originalName: string;
    file: File;

    constructor(file: File) {
        this.file = file;
    }

}
