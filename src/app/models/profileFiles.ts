export class ProfileFiles {

  id: number;
  idProfile: number;
  fileUrl: string;
  extention: string;

  constructor(id: number, idPro: number, file: string, ext: string) {
    this.id = id;
    this.idProfile = idPro;
    this.fileUrl = file;
    this.extention = ext;
  }
}