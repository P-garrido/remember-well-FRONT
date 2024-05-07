export class Product {
  id: number | null;
  name: string;
  description: string;
  price: number;
  imageUrls: Array<string>;

  constructor(id: number | null, name: string, desc: string, price: number, imgUrl: Array<string>) {
    this.id = id;
    this.description = desc;
    this.name = name;
    this.price = price;
    this.imageUrls = imgUrl;
  }
}