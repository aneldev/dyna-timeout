export declare class DynaTimeout {
    private _holder;
    add(id: string, timeout: number, cb: Function, ...args: any[]): void;
    update(id: string, timeout?: number, cb?: Function, ...args: any[]): void;
    cancel(id: string): void;
    cancelAll(): void;
    readonly length: number;
    getIds(): Array<string>;
}
