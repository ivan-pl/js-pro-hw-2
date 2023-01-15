type AsyncFunc<T> = () => Promise<T>;

export default async function promiseReduce<T>(
  asyncFunctions: [AsyncFunc<T>, ...AsyncFunc<T>[]],
  reduce: (memo: T, value: T) => T,
  initialValue: T
): Promise<T> {
  let memoValue = initialValue;
  for (const func of asyncFunctions) {
    memoValue = reduce(memoValue, await func());
  }

  return memoValue;
}
