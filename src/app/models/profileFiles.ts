export class ProfileFiles {

  id: number;
  idProfile: number;
  fileUrl: string;

  constructor(id: number, idPro: number, file: string) {
    this.id = id;
    this.idProfile = idPro;
    this.fileUrl = file;
  }
}