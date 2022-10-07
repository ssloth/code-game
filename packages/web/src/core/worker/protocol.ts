export type MessageEventData = WorkerMethod | WorkerResult;

export interface WorkerMethod<T = Record<string, unknown>> {
  _type: 'method',
  _id: number;
  method: string;
  params: T;
}

export interface WorkerResult<T = Record<string, unknown>> {
  _type: 'result',
  _id: number;
  method: string;
  data: T
}