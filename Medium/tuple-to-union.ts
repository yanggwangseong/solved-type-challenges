import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<TupleToUnion<[123, "456", true]>, 123 | "456" | true>>,
  Expect<Equal<TupleToUnion<[123]>, 123>>
];

// ============= Your Code Here =============
//type TupleToUnion<T> = T extends unknown[] ? T[number] : never;

//type TupleToUnion<T extends any[]> = keyof { [Key in T[number]]: true };

type TupleToUnion<T> = T extends [infer Head, ...infer Tail]
  ? Head | TupleToUnion<Tail>
  : never;
