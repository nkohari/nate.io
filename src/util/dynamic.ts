import { lazy } from 'react';

type Module<T> = { [K in keyof T]: React.ComponentType<any> };
export type ImportFunction<T> = () => Promise<Module<T>>;

export function dynamic<T>(importFunction: ImportFunction<T>, name: keyof T) {
  return lazy(() => importFunction().then((module) => ({ default: module[name] })));
}
