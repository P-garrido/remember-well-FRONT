export class Tribute {

  id: number;
  idProfile: number;
  text: string;

  constructor(id: number, idPro: number, text: string) {
    this.id = id;
    this.idProfile = idPro;
    this.text = text;
  }
}