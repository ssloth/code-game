import { Mech } from '~src/base/mech';

interface IStateItem<T extends Mech> {
  update?: (mech: T) => any;
}

interface IState<T extends Mech> {
  [state: string]: string | IStateItem<T>;
  $init: string;
  $params: any;
  $current: string;
}

interface IParalleState<T extends Mech = Mech> {
  [parallelName: string]: IState<T>;
}

/**
 * 状态机
 */
export class ActionStateMachine<T extends Mech> {
  constructor(public mech: T, public config: IParalleState) {
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
      const currentState = states[states.$current] as IStateItem<T>;
      currentState.update?.(this.mech);
    });
  }

  // 切换当前状态
  public tigger(parallelName: string, stateName: string, args: any) {
    this.config[parallelName].$current = stateName;
    this.config[parallelName].$params = args;
  }
}
