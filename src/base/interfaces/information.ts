export interface ICartesianCoordinate {
  x: number;
  y: number;
  z?: number;
}

export interface IPolarCoordinates {
  angle: number;
  distance: number;
}

export type IAbsolutePosition = ICartesianCoordinate;
export type IRelativePosition = ICartesianCoordinate;
export type ICommonPosition = IAbsolutePosition | IRelativePosition;

export interface IPosition {
  absolute: IAbsolutePosition;
  relative: IRelativePosition;
}

export interface ISelfInformation {
  position: IPosition;
}

export interface IFriendInformation {
  position: IPosition;
}

export interface IEmptyInformation {
  position: IPosition;
}

export interface BaeInformation {
  self: ISelfInformation;
  friend: IFriendInformation[];
  empty: IEmptyInformation[];
}
