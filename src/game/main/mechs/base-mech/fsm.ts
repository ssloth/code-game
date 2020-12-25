import { IParalleStateConfig } from '~src/base/action-state-machine';
import { Math as PMath } from 'phaser';
import { BaseBullet } from '../../bullet/base-bullet';
import { BaseMech } from '.';
import MainScene from '../..';

export const createFSM = (mech: BaseMech) => {
  const fsm: IParalleStateConfig = {
    move: {
      $init: 'noop',
      $params: '',
      // 前进
      forward: {
        start(params) {
          mech.current.force.setLength(mech.model.MAX_THRUST * params);
        },
        end() {
          mech.current.force.setLength(ZERO);
        },
      },
      // 前进到
      forwardToThen: {},
      // 刹车
      brake: {
        start() {
          mech.current.force.setLength(ZERO);
        },
        update() {
          mech.setFrictionAir(0.01);
        },
        end() {
          mech.setFrictionAir(0);
        },
      },
      // 刹车直到停止
      brakeToStopThen: {},
    },
    rotate: {
      $init: 'noop',
      // 左转
      rotateLeft: {
        update() {
          mech.setAngularVelocity(-Math.PI / 720);
        },
        end() {
          mech.setAngularVelocity(0);
        },
      },
      // 右转
      rotateRight: {
        update() {
          mech.setAngularVelocity(Math.PI / 720);
        },
        end() {
          mech.setAngularVelocity(0);
        },
      },
      // 左转到
      rotateLeftToThen: {},
      // 右转到
      rotateRightToThen: {},
      // 最短到距离转到
      rotateToThen: {},
    },
    attach: {
      $init: 'noop',
      // 开火
      attach: {
        update() {
          new BaseBullet('plasma', MainScene.scene.gameDataLoader.bulletModels['B-1'], {
            current: mech.body.position,
            angle: mech.angle,
          });
        },
      },
      // 冷却
      cd: {},
    },
    normal: {
      $init: 'run',
      run: {
        update() {
          if (mech.body.speed < mech.model.MAX_SPEED) {
            mech.thrust(mech.model.MAX_THRUST * 2);
          }
        },
      },
    },
  };
  return fsm;
};
