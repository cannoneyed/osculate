import { inject } from 'mobx-react';

export function connect<T, K extends keyof T>(
  ComponentClass: React.ComponentType<T>,
  ...stores: K[]
): React.ComponentType<Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>> {
  return inject(...stores)(ComponentClass);
}