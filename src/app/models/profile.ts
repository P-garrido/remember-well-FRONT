import { ProfileFiles } from "./profileFiles";
import { Tribute } from "./tribute";
import { User } from "./user";

export class Profile {

  id: number;
  idOwner: number;
  name: string;
  deathDate: Date;
  aboutMe: string;
  playlist: string;
  filesGallery: Array<ProfileFiles>;
  tributes: Array<Tribute>;
  profilePicUrl: string;
  editors: Array<User>;

  constructor(id: number, idOw: number, name: string, deathDate: Date, aboutMe: string, playlist: string, files: Array<ProfileFiles>, tributes: Array<Tribute>, profilePicUrl: string, editors: Array<User>) {
    this.id = id;
    this.idOwner = idOw;
    this.name = name;
    this.deathDate = deathDate;
    this.aboutMe = aboutMe;
    this.playlist = playlist;
    this.filesGallery = files;
    this.tributes = tributes;
    this.profilePicUrl = profilePicUrl;
    this.editors = editors;
  }

}