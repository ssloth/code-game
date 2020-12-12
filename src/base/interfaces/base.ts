
// 基础属性
export interface IBase {
  // 隐蔽性 为 0 时 不可被发现
  readonly CONCEALMENT: number;
  // 大小
  readonly SIZE: { WIDTH: number; HEIGHT: number };
  // 密度
  readonly DENSITY: number;
  // 阻力
  readonly FRICTION_AIR: number;
}

// 可以被攻击的单位
export interface ICanBeAttacked {
  // 最大生命值
  MAX_HEALTH: number;
}

// 可以发起攻击的单位
export interface ICanAttach {
  // 攻击力
  ATTACK_POWER: number;
}

