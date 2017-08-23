interface IItemHolder {
  [key: string]: IItem;
}

interface IItem {
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
    this._holder[id] = {
      cb, timeout, args, timer: setTimeout((...args)=>{
        this.cancel(id);
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
