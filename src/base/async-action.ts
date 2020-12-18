export class AsyncActionQueue<T> {
  private value: IAsyncAction<T>[] = [];

  update(value: IAsyncAction<T>[]) {
    this.value = value;
  }

  constructor() {}
}

export interface IAsyncAction<T> {
  name: T;
  args: any;
  level: number;
}
