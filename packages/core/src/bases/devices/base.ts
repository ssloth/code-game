export abstract class Device<T extends Record<string, unknown>> {

  private status: 0 /** 关闭 */ | 1 /** 开启 */ | -1 /** 损坏 */ = 1;

  abstract state: T;

  protected readonly setState = (state: Partial<T>) => {
    this.state = Object.assign({}, this.state, state);
  }

  protected readonly open = () => {
    if (this.state.status === 0) {
      this.status = 1;
    }
  };

  protected readonly close = () => {
    if (this.state.status === 1) {
      this.status = 0;
    }
  };

  protected readonly getStatus = () => {
    return this.status;
  }

}