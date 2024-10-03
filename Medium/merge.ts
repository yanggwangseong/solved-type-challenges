import { Equal, Expect } from "../test-utils";

type Foo = {
  a: number;
  b: string;
};

type Bar = {
  b: number;
  c: boolean;
};

type cases = [
  Expect<
    Equal<
      Merge<Foo, Bar>,
      {
        a: number;
        b: number;
        c: boolean;
      }
    >
  >
];

// ============= Your Code Here =============
// type Merge<F, S> = {
//   [P in keyof F | keyof S]: P extends keyof S // 2개의 F와 S의 key를 받아와서 그걸 조건문을 통해서 분기처리
//     ? S[P]
//     : P extends keyof F
//     ? F[P]
//     : never;
// };

// type Merge<L, R> = {
//   [P in keyof (L & R)]: P extends keyof R ? R[P] : (L & R)[P];
// };

type Merge<
  A extends Record<PropertyKey, unknown>,
  B extends Record<PropertyKey, unknown>
> = {
  [K in keyof (A & B)]: K extends keyof B ? B[K] : A[K];
};
