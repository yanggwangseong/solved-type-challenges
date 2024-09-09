import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<Replace<"foobar", "bar", "foo">, "foofoo">>,
  Expect<Equal<Replace<"foobarbar", "bar", "foo">, "foofoobar">>,
  Expect<Equal<Replace<"foobarbar", "", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"foobarbar", "bar", "">, "foobar">>,
  Expect<Equal<Replace<"foobarbar", "bra", "foo">, "foobarbar">>,
  Expect<Equal<Replace<"", "", "">, "">>
];

// ============= Your Code Here =============
type Replace2<
  T extends string,
  From extends string,
  To extends string
> = From extends ""
  ? T
  : T extends `${infer L}${From}${infer R}`
  ? `${L}${To}${R}`
  : T;

type Replace<
  T extends string,
  From extends string,
  To extends string
> = From extends ""
  ? T
  : T extends `${From}${infer Tail}`
  ? `${To}${Tail}`
  : T extends `${infer Head}${infer Tail}`
  ? `${Head}${Replace<Tail, From, To>}`
  : T;
