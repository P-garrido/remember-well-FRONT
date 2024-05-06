
export class Comment {
  id: number | null;
  text: string;
  stars: number;
  userId: number;



  constructor(id: number | null, text: string, stars: number, us: number) {
    this.id = id;
    this.text = text;
    this.stars = stars;
    this.userId = us;
  }
}