import { Cameras } from "phaser";
import { switchMap, takeUntil, withLatestFrom, filter, map, tap } from "rxjs";
import { mouseDown$, mouseMove$, mouseUp$, keyboardState } from "./document";

const ofCamerasDrag = (cameras:  Cameras.Scene2D.Camera) => mouseDown$
  .pipe(
    switchMap(() => mouseMove$.pipe(takeUntil(mouseUp$))),
    filter(() => keyboardState['Space'] === 1),
    withLatestFrom(
      mouseDown$.pipe(map(e => (({ x: -e.pageX + cameras.x, y: -e.pageY + cameras.y })))),
      (move: MouseEvent, init: { x: number, y: number }) => {
        return {
          x: move.pageX + init.x,
          y: move.pageY + init.y
        };
      }
    ),
  )

export {
  ofCamerasDrag
}