export class User {
  id: number;
  mail: string;
  name: string;
  password: string;
  phone: string;
  admin: boolean;



  constructor(id: number, mail: string, name: string, pass: string, phone: string, admin: boolean) {
    this.id = id;
    this.mail = mail;
    this.name = name;
    this.password = pass;
    this.phone = phone;
    this.admin = admin;
  }
}