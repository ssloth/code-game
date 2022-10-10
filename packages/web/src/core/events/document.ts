import { fromEvent, } from 'rxjs';

const keydown$ = fromEvent<KeyboardEvent>(document, 'keydown')
const keyup$ = fromEvent<KeyboardEvent>(document, 'keyup')
const mouseDown$ = fromEvent<MouseEvent>(document, "mousedown");
const mouseUp$ = fromEvent<MouseEvent>(document, "mouseup");
const mouseMove$ = fromEvent<MouseEvent>(document, "mousemove");
const mousewheel$ = fromEvent<WheelEvent>(document, "mousewheel", { passive: true });

const keyboardState: Record<KeyboardEvent['code'], 0 | 1> = {};
const mouseState: { x: number, y: number } = { x: -1, y: -1 };

keydown$.subscribe(e => keyboardState[e.code] = 1);
keyup$.subscribe(e => keyboardState[e.code] = 0);
mouseMove$.subscribe(e => (mouseState.x = e.pageX, mouseState.y = e.pageY))

export {
  keydown$,
  keyup$,
  mouseDown$,
  mouseUp$,
  mouseMove$,
  mousewheel$,

  mouseState,
  keyboardState
}