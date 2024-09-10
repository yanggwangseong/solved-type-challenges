import { Equal, Expect } from "../test-utils";

type Case1 = AppendArgument<(a: number, b: string) => number, boolean>;
type Result1 = (a: number, b: string, x: boolean) => number;

type Case2 = AppendArgument<() => void, undefined>;
type Result2 = (x: undefined) => void;

type cases = [
  Expect<Equal<Case1, Result1>>,
  Expect<Equal<Case2, Result2>>,
  // @ts-expect-error
  AppendArgument<unknown, undefined>
];

// ============= Your Code Here =============
// Parameter 유틸 타입과 ReturnType을 활용한 풀이
type AppendArgument1<Fn extends (...args: any[]) => unknown, A> = (
  ...args: [...Parameters<Fn>, A]
) => ReturnType<Fn>;

// infer를 활용한 풀이
type AppendArgument<Fn extends (...args: any[]) => unknown, A> = Fn extends (
  ...args: infer Args
) => infer Return
  ? (...args: [...Args, A]) => Return
  : never;
