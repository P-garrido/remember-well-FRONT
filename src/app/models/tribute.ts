export class Tribute {

  id: number | null;
  idProfile: number;
  text: string;

  constructor(id: number | null, idPro: number, text: string) {
    this.id = id;
    this.idProfile = idPro;
    this.text = text;
  }
}