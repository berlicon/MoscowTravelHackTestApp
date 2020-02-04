export class Elem {
  public id: number;
  public name: string;
  public active: boolean;
  public list: number[];

  constructor(id: number, name: string, active: boolean, list: number[]) {
    this.id = id;
    this.name = name;
    this.active = active;
    this.list = list;
  }
}

