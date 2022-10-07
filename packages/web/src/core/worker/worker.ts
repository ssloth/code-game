import { filter, fromEvent, map } from 'rxjs';
import { MessageEventData, WorkerMethod } from './protocol';

const genId = () => ((i: number) => 1 + i)(0);

const programMap = new Map<number, Function>();

const message$ = fromEvent<MessageEvent<MessageEventData>>(self, 'message');
const data$ = message$.pipe(map(e => e.data));
const methods$ = data$.pipe(filter((d): d is WorkerMethod => (d._type === 'method')));

const app = {
  _methods: new Map<string, (params: Record<string, unknown>) => Promise<unknown>>(),
  registerMethods: (name: string, fn: (params: Record<string, unknown>) => Promise<unknown>) => {
    app._methods.set(name, fn);
    return app;
  },
  run: () => {
    methods$.subscribe(({ method, params, _id, }) => {
      const fn = app._methods.get(method);
      fn?.(params).then(result => {
        self.postMessage({
          _id,
          method: method,
          data: result
        })
      })
    })
    return app;
  }
};


app
  .registerMethods('registerProgram', async (params) => {
    programMap.set(genId(), new Function('system', params.code as string));
    return true;
  })
  .registerMethods('exec', async (params) => {
    const fn = programMap.get(params.pid as number)!;
    return await fn(params.system);
  })
  .run();

