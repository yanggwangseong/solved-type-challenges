import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>
];

// ============= Your Code Here =============
/**
 * ver1
 */
type Trim2<S extends string> = S extends
  | `${" " | "\n" | "\t"}${infer K}`
  | `${infer K}${" " | "\n" | "\t"}`
  ? Trim<K>
  : S;

/***
 * ver2
 */
type Whitespace = " " | "\n" | "\t";
type TrimLeft<T extends string> = T extends `${Whitespace}${infer K}`
  ? TrimLeft<K>
  : T;
type TrimRight<T extends string> = T extends `${infer K}${Whitespace}`
  ? TrimRight<K>
  : T;
type Trim<S extends string> = TrimLeft<TrimRight<S>>;
