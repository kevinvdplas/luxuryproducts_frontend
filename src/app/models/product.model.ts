import { Category } from "./category.model";

export class Product {
  public id: number;
  private _thumpnail: string;
  private _name: string;
  private _description: string;
  private _price: number;
  private _amount: number;
  public category: Category;

  constructor(thumpnail, name, description, price, amount) {
    this.thumpnail = thumpnail;
    this.name = name;
    this.description = description;
    this.price = price;
    this.amount = amount;
  }

  public get thumpnail(): string {
    return this._thumpnail;
  }
  public set thumpnail(value: string) {
    this.thumpnail = value;
  }

  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }

  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }
}
