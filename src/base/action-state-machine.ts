import _ from 'lodash';
interface IStateItem {
  start?: () => any;
  update?: () => any;
  end?: () => any;
}

interface IState {
  [state: string]: string | IStateItem;
  $init: string;
  $params: any;
  $current: string;
}

interface IParalleState {
  [parallelName: string]: IState;
}

/**
 * 状态机
 */
export class ActionStateMachine {
  constructor(public config: IParalleState) {
    this.config = Object.fromEntries(
      Object.entries(this.config).map(([key, val]) => [
        key,
        { ...val, $current: val.$init, $params: {} },
      ]),
    );
  }

  // 使用 update 方法消费状态
  public update() {
    Object.values(this.config).forEach((states) => {
      if (states.$current === 'noop') return;
      const currentState = states[states.$current] as IStateItem;
      currentState.update?.();
    });
  }

  // 切换当前状态
  public tigger(parallelName: string, stateName: string, args: any) {
    if (
      this.config[parallelName].$current === stateName &&
      _.isEqual(this.config[parallelName].$params, args)
    )
      return;
    (this.config[parallelName][this.config[parallelName].$current] as IStateItem).end?.();
    this.config[parallelName].$current = stateName;
    this.config[parallelName].$params = args;
    (this.config[parallelName][stateName] as IStateItem).start?.();
  }
}
