import { Mech } from '~src/base/mech';
import { computeDistance } from '~src/utils';

export type MechPositionRelation = WeakMap<Mech, MechPosition[]>;

export interface MechPosition {
  mech: Mech;
  distance: number;
}

// 预处理
export const pretreatment = (mechs: Mech[]) => {
  const relation = new WeakMap<Mech, MechPosition[]>();
  mechs.forEach((me) => {
    const mechPositionList: MechPosition[] = [];
    mechs.forEach((item) => {
      if (me.id === item.id) return;
      if (relation.has(item)) {
        const d = relation.get(item)?.find((it) => it.mech === item)?.distance;
        if (d) {
          mechPositionList.push({ mech: item, distance: d });
          return;
        }
      }
      const d = computeDistance(me.state.position, item.state.position);
      mechPositionList.push({ mech: item, distance: d });
    });
    relation.set(me, mechPositionList);
  });
  return {
    mechPositionRelation: relation,
  };
};
