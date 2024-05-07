import { User } from "./user";

export class Comment {
  id: number | null;
  text: string;
  stars: number;
  user: User



  constructor(id: number | null, text: string, stars: number, us: User) {
    this.id = id;
    this.text = text;
    this.stars = stars;
    this.user = us;
  }

}