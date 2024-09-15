import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
// 새로운 배열 Acc를 만들어서 거기에 하나하나 차곡차곡 넣어서 length로 길이를 구한다
type LengthOfString1<
  S extends string,
  Acc extends string[] = []
> = S extends `${infer Head}${infer Tail}`
  ? LengthOfString1<Tail, [...Acc, Head]>
  : Acc["length"];

/**
 *
 * type A5 = StringToTuple<'asdf'>;
 * type B5 = ['asdf', 'sdf', 'df', 'f'];
 * type C5 = Expect<Equal<A5, B5>>;
 *
 *
 */
type StringTotule<T extends string> = T extends `${T[0]}${infer Rest}`
  ? [T, ...StringTotule<Rest>]
  : [];

type LengthOfString2<T extends string> = StringTotule<T>["length"];

type LengthOfString<
  T extends string,
  Acc extends string[] = []
> = T extends `${string}${infer T}`
  ? LengthOfString<T, [string, ...Acc]>
  : Acc["length"];
