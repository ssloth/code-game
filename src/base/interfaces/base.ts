export type Concealment = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// 基础属性
export interface IBase {
  // 隐蔽性 为 0 时 不可被发现
  CONCEALMENT: Concealment;
  // 大小
  SIZE: { WIDTH: number; HEIGHT: number };
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

// 可以移动的单位
export interface ICanMove {
  SPEED: number;
}
