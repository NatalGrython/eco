import { call, SagaReturnType, select } from "redux-saga/effects";
import { RootState } from "../../store";

export function* selectTs<T>(selector: (state: RootState) => T) {
  const result: T = yield select(selector);
  return result;
}

export function* callTs<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
) {
  const result: SagaReturnType<Fn> = yield call(fn, ...args);
  return result;
}
