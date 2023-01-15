export default function promiseReduce<T>(
  asyncFunctions: (() => Promise<T>)[],
  reduce: (memo: T, value: T) => T,
  initialValue: T
): Promise<T> {
  return Promise.resolve(1 as T);
}
