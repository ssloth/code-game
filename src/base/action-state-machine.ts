import _ from 'lodash';
interface IStateItem {
  start?: (arg?: any) => any;
  update?: (arg?: any) => any;
  end?: (arg?: any) => any;
}

export interface IState {
  [state: string]: string | IStateItem;
  $init: string;
  $params: any;
  $current: string;
}

export interface IParalleState {
  [parallelName: string]: IState;
}

export interface IParalleStateConfig {
  [parallelName: string]: Omit<IState, '$current'>;
}

/**
 * 状态机
 */
export class ActionStateMachine {
  constructor(private config: IParalleState) {
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
  public trigger(parallelName: string, stateName: string, args?: any) {
    if (
      (this.config[parallelName].$current === stateName &&
        _.isEqual(this.config[parallelName].$params, args)) ||
      stateName === 'keep'
    )
      return;
    if (this.config[parallelName].$current !== 'noop') {
      (this.config[parallelName][this.config[parallelName].$current] as IStateItem).end?.();
    }
    this.config[parallelName].$current = stateName;
    this.config[parallelName].$params = args;
    if (stateName === 'noop') return;
    (this.config[parallelName][stateName] as IStateItem).start?.(args);
  }
}
