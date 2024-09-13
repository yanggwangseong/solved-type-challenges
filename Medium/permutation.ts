import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<Permutation<"A">, ["A"]>>,
  Expect<
    Equal<
      Permutation<"A" | "B" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<
    Equal<
      Permutation<"B" | "A" | "C">,
      | ["A", "B", "C"]
      | ["A", "C", "B"]
      | ["B", "A", "C"]
      | ["B", "C", "A"]
      | ["C", "A", "B"]
      | ["C", "B", "A"]
    >
  >,
  Expect<Equal<Permutation<boolean>, [false, true] | [true, false]>>,
  Expect<Equal<Permutation<never>, []>>
];

// ============= Your Code Here =============
type Permutation2<T, Acc = T> = [T] extends [never]
  ? []
  : Acc extends T
  ? [Acc, ...Permutation2<Exclude<T, Acc>>]
  : [];

type Permutation<T, Acc = T> = [T] extends [never]
  ? []
  : Acc extends Acc
  ? [Acc, ...Permutation<Exclude<T, Acc>>]
  : never;
