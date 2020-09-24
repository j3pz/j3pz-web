export const lit = <V extends keyof any>(v: V): V => v;
export const Type = Function;
export type Type<T> = new (...args: any[]) => T;
export type Lit<V> = V;
