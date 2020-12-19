import { BaseMech } from '.';

export const fsm = {
  move: {
    $init: 'noop',
    $params: 0,
    // 前进
    forward: {
      update: (mech: BaseMech) => {
        mech.current.state.stop = false;
        mech.current.state.move = undefined;
        mech.current.force.setLength(mech.model.MAX_THRUST * fsm.move.$params || 1);
        console.log('foward');
      },
    },
    // 前进到
    forwardToThen: {},
    // 停止
    stopThen: {},
  },
  rotate: {
    $init: 'noop',
    // 左转
    rotateLeft: {},
    // 右转
    rotateRight: {},
    // 左转到
    rotateLefeToThen: {},
    // 右转到
    rotateRightToThen: {},
    // 最短到距离转到
    rotateToThen: {},
  },
  attach: {
    $init: 'noop',
    // 开火
    attach: {},
    // 冷却
    cd: {},
  },
};
