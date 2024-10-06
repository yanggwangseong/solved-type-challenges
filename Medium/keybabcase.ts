import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============
// type KebabCase<T> = T extends `${infer Head}${infer Tail}`
//   ? Tail extends Uncapitalize<Tail>
//     ? `${Uncapitalize<Head>}${KebabCase<Tail>}`
//     : `${Uncapitalize<Head>}-${KebabCase<Tail>}`
//   : T;

type KebabCase<T extends string> = T extends `${infer Head}${infer Tail}`
  ? `${Lowercase<Head>}${Tail extends Uncapitalize<Tail>
      ? KebabCase<Tail>
      : `-${KebabCase<Tail>}`}`
  : T;
