import promiseReduce from "./promiseReduce";

describe("promiseReduce()", () => {
  it("returns 2", async () => {
    const checkStack: string[] = []; // checks the order in which functions are run

    const fn1 = () => {
      checkStack.push("fn1");
      return Promise.resolve(1);
    };

    const fn2 = (): Promise<number> =>
      new Promise((resolve) => {
        checkStack.push("fn2");
        setTimeout(() => resolve(2), 1000);
      });

    const result = await promiseReduce(
      [fn1, fn2],
      function (memo: number, value: number) {
        checkStack.push("reduce");
        return memo * value;
      },
      1
    );

    expect(result).toBe(2);
    expect(checkStack).toEqual(["fn1", "fn2", "reduce"]);
  });

  it("returns 6", async () => {
    const checkStack: string[] = []; // checks the order in which functions are run

    const fn1 = () => {
      checkStack.push("fn1");
      return Promise.resolve(1);
    };

    const fn2 = (): Promise<number> =>
      new Promise((resolve) => {
        checkStack.push("fn2");
        setTimeout(() => resolve(2), 1000);
      });

    const fn3 = () => {
      checkStack.push("fn3");
      return Promise.resolve(3);
    };

    const result = await promiseReduce(
      [fn1, fn2, fn3],
      function (memo: number, value: number) {
        checkStack.push("reduce");
        return memo + value;
      },
      1
    );

    expect(result).toBe(6);
    expect(checkStack).toEqual(["fn1", "fn2", "fn3", "reduce"]);
  });
});
