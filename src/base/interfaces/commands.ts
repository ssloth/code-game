import { IAbsolutePosition } from "./information";

export interface ICommand {
  move: (position: IAbsolutePosition) => void;
  attach: (position: IAbsolutePosition) => void;
}
