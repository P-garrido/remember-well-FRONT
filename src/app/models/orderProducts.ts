import { Product } from "./products";

export class OrderProduct {

  id: number | null;
  idOrd: number | null;
  product: Product;
  quantity: number;

  constructor(id: number | null, idOrd: number | null, prod: Product, quan: number) {

    this.id = id;
    this.idOrd = idOrd;
    this.product = prod;
    this.quantity = quan;
  }
}