import { fromEvent, map, take } from 'rxjs';
import MainWorker from './worker?worker';

export { default as programManager } from './programManager';

const worker = new MainWorker();

const message$ = fromEvent<MessageEvent>(worker, 'message');

const data$ = message$.pipe(map(e => e.data));

data$.subscribe(data => console.log(data));

class ProgramManager {
  registerProgram(code: string) {
    worker.postMessage('');
    return data$.pipe(take(1))
  }

  unregisterProgram(id: number) {
    
  }
}

export default new ProgramManager();