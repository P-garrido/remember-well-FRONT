
export class Comment {
  id: number | null;
  text: string;
  stars: number;
  username: string;
  userId: number;



  constructor(id: number | null, text: string, stars: number, name: string, usId: number) {
    this.id = id;
    this.text = text;
    this.stars = stars;
    this.username = name;
    this.userId = usId;
  }
}