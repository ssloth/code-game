import { IChip } from '~src/base/interfaces/chip';

export interface IPlayerData {
  name: string;
  faction: string;
  chips: IChip[];
  commander: any;
}
