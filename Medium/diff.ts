import { Equal, Expect } from "../test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
// type Diff<L, R> = {
//   [P in keyof L | keyof R as Exclude<P, keyof L & keyof R>]: P extends keyof L
//     ? L[P]
//     : P extends keyof R
//     ? R[P]
//     : never;
// };

// type Diff<L, R> = Omit<L & R, keyof (L | R)>;
type Diff<L, R> = Omit<L & R, keyof L & keyof R>;

// type Diff<L, R> = Required<
//   Omit<L, keyof R>
//   & Omit<R, keyof L>
// >;
