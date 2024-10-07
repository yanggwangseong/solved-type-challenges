import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<
    Equal<AnyOf<[1, "test", true, [1], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[1, "", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "test", false, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", true, [], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [1], {}]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { name: "test" }]>, true>>,
  Expect<Equal<AnyOf<[0, "", false, [], { 1: "test" }]>, true>>,
  Expect<
    Equal<AnyOf<[0, "", false, [], { name: "test" }, { 1: "test" }]>, true>
  >,
  Expect<Equal<AnyOf<[0, "", false, [], {}, undefined, null]>, false>>,
  Expect<Equal<AnyOf<[]>, false>>
];

// ============= Your Code Here =============

type Falsy = 0 | "" | false | [] | Record<string, never> | null | undefined;

type AnyOf<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends Falsy
    ? AnyOf<Tail>
    : true
  : false;

// type AnyOf<T extends unknown[], I = T[number]> = (
//   I extends Falsy ? false : true
// ) extends false
//   ? false
//   : true;

// type AnyOf<T extends unknown[]> = T[number] extends Falsy ? false : true;
