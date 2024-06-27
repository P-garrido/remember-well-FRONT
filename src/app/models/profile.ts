import { ProfileFiles } from "./profileFiles";
import { Tribute } from "./tribute";
import { User } from "./user";

export class Profile {

  id: number;
  idOwner: number;
  name: string;
  birthDate: Date;
  deathDate: Date;
  aboutMe: string;
  filesGallery: Array<ProfileFiles>;
  tributes: Array<Tribute>;
  backPicUrl: string;
  profilePicUrl: string;
  editors: Array<User>;

  constructor(id: number, idOw: number, name: string, birthDate: Date, deathDate: Date, aboutMe: string, files: Array<ProfileFiles>, tributes: Array<Tribute>, backPicUrl: string, profilePicUrl: string, editors: Array<User>) {
    this.id = id;
    this.idOwner = idOw;
    this.name = name;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.aboutMe = aboutMe;
    this.filesGallery = files;
    this.tributes = tributes;
    this.backPicUrl = backPicUrl;
    this.profilePicUrl = profilePicUrl;
    this.editors = editors;
  }

}