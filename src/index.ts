interface IItemHolder {
  [key: string]: IItem;
}

interface IItem {
  id: string;
  cb: Function;
  args: any[];
  timeout: number;
  timer: any;
}

export class DynaTimeout {
  private _holder: IItemHolder = {};

  public add(id: string, timeout: number, cb: Function, ...args): void {
    if (this._holder[id]) {
      this.update(id, timeout, cb, ...args);
      return;
    }
    let item: IItem = this._holder[id] = {
      id,
      cb, timeout, args, timer: setTimeout((...args)=>{
        this.cancel(item.id);
        cb(...args);
      },timeout, ...args)
    }
  }

  public update(id: string, timeout?: number, cb?: Function, ...args): void {
    let currentItem:IItem=this._holder[id];
    if (!currentItem) {
      console.warn(`dyna-timeout: update: id [${id}] doesn't exist to update it`);
      return;
    }

    let cb_:Function= cb || (currentItem && currentItem.cb) || (() => {console.error('dyna-timeout: cb not defined using the update method')});
    let timeout_:number= timeout || (currentItem && currentItem.timeout);
    let args_:any[]= (args.length && args || false) || (currentItem && currentItem.args) || [];

    this.cancel(id);
    this.add(id, timeout_, cb_, ...args_);
  }

  public changeId(oldId: string, newId: string): boolean {
    if (this._holder[oldId]) {
      this._holder[newId] = this._holder[oldId];
      this._holder[newId].id = newId;
      delete this._holder[oldId];
      return true;
    }
    return false;
  }

  public cancel(id: string): void {
    if (this._holder[id]) {
      clearTimeout(this._holder[id].timer);
      delete this._holder[id];
    }
  }

  public cancelAll():void{
    Object.keys(this._holder).forEach(this.cancel.bind(this));
  }

  public get length():number{
    return this.getIds().length;
  }

  public getIds():Array<string>{
    return Object.keys(this._holder);
  }
}
