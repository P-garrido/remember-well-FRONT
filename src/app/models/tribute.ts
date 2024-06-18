export class Tribute {

  id: number | null;
  idProfile: number;
  name: string;
  text: string;

  constructor(id: number | null, idPro: number, name: string, text: string) {
    this.id = id;
    this.idProfile = idPro;
    this.name = name;
    this.text = text;
  }
}