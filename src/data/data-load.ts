import { IBulletModel } from '~src/base/interfaces/bullet';
import { IMechModel } from '~src/base/interfaces/mech';
import mechModelData from './mech-model.json';
import bulletModelData from './bullet-model.json';
const data: {
  mechModels: { [key: string]: IMechModel };
  bulletModels: { [key: string]: IBulletModel };
} = {
  mechModels: mechModelData.data
    .map((data: any) => ({
      NAME: data.name,
      MAX_ENERGY: data.max_energy,
      MAX_POWER: data.max_power,
      MAX_HEALTH: data.max_health,
      MAX_THRUST: data.max_thrust / 1000,
      MAX_SPEED: data.max_speed / 100,
      ATTACK_POWER: data.attack_power,
      CONCEALMENT: data.concealment,
      DENSITY: data.density,
      FRICTION_AIR: data.friction_air,
      SIZE: { WIDTH: data.size.width, HEIGHT: data.size.height },
    }))
    .reduce((acc, val) => ({ ...acc, [val.NAME]: val }), {}),

  bulletModels: bulletModelData.data
    .map((data) => ({
      NAME: data.name,
      SPEED: data.speed / 100,
      ATTACK_POWER: data.attack_power,
      SIZE: { WIDTH: data.size.width, HEIGHT: data.size.height },
      CONCEALMENT: 0,
      DENSITY: 1,
      FRICTION_AIR: 0,
    }))
    .reduce((acc, val) => ({ ...acc, [val.NAME]: val }), {}),
};

export default data;
