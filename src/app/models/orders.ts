import { OrderProduct } from "./orderProducts";
import { User } from "./user";

export class Order {
  id: number | null;
  user: User;
  date: Date;
  total: number;
  province: string;
  city: string;
  address: string;
  zipCode: string;
  floor: string | null;
  appartament: string | null;;
  delivered: boolean;
  orderProducts: Array<OrderProduct>;
  payed: string;

  constructor(id: number | null, us: User, date: Date, tot: number, prov: string, city: string, zip: string, address: string, floor: string | null, appartament: string | null, delivered: boolean, op: Array<OrderProduct>, payed: string) {
    this.id = id;
    this.user = us;
    this.date = date;
    this.total = tot;
    this.province = prov;
    this.city = city;
    this.address = address;
    this.zipCode = zip;
    this.floor = floor;
    this.appartament = appartament;
    this.delivered = delivered;
    this.orderProducts = op;
    this.payed = payed;
  }


}