import { BaseMech } from '.';
import MainScene from '../..';
import { BaseBullet } from '../../bullet/base-bullet';

export const createFSM = (mech: BaseMech) => {
  const fsm = {
    move: {
      $init: 'noop',
      $params: 0,
      // 前进
      forward: {
        start() {
          mech.current.force.setLength(mech.model.MAX_THRUST * fsm.move.$params || 1);
        },
        update() {
          mech.current.force.setAngle(mech.body.angle);
          if (mech.body.speed < mech.model.MAX_SPEED) {
            mech.applyForce(mech.current.force);
          }
        },
      },
      // 前进到
      forwardToThen: {},
      // 刹车
      brake: {
        start() {},
        update() {
          mech.setFrictionAir(0.01);
          mech.current.force.setLength(ZERO);
        },
        end() {},
      },
      // 刹车直到停止
      brakeToStopThen: {},
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
      attach: {
        update(mech: BaseMech) {
          new BaseBullet('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
            current: mech.body.position,
            angle: mech.angle,
          });
        },
      },
      // 冷却
      cd: {},
    },
  };
};
