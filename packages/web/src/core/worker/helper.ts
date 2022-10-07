import { fromEvent, map, take, filter } from 'rxjs';
import { MessageEventData, WorkerResult } from './protocol';
import MainWorker from './worker?worker';

const worker = new MainWorker();
const genId = () => ((i: number) => 1 + i)(0);

const message$ = fromEvent<MessageEvent<MessageEventData>>(worker, 'message');
const data$ = message$.pipe(map(e => e.data));
const result$ = data$.pipe(filter((d): d is WorkerResult => (d._type === 'result')));

export const call = (method: string, params: unknown) => {
  const id = genId();

  return new Promise((resolve, reject) => {
    result$
      .pipe(filter(data => data.method === method && data._id === id))
      .pipe(take(1))
      .pipe(map(r => r.data))
      .subscribe(resolve);

    worker.postMessage({
      method,
      params,
      id
    });
  })
}