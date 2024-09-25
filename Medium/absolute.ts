import { Equal, Expect } from "../test-utils";
// number, string, 혹은 bigint을 받는 Absolute 타입을 만드세요. 출력은 양수 문자열이어야 합니다.
/**
 * type Test = -100
 * type Result = Absolute<Test> // expected to be "100"
 */

type cases = [
  Expect<Equal<Absolute<0>, "0">>,
  Expect<Equal<Absolute<-0>, "0">>,
  Expect<Equal<Absolute<10>, "10">>,
  Expect<Equal<Absolute<-5>, "5">>,
  Expect<Equal<Absolute<"0">, "0">>,
  Expect<Equal<Absolute<"-0">, "0">>,
  Expect<Equal<Absolute<"10">, "10">>,
  Expect<Equal<Absolute<"-5">, "5">>,
  Expect<Equal<Absolute<-1_000_000n>, "1000000">>,
  Expect<Equal<Absolute<9_999n>, "9999">>
];

// ============= Your Code Here =============
// type Absolute<T extends number | string | bigint> = `${T}` extends `-${infer P}`
//   ? P
//   : `${T}`;

// type Absolute<T extends number | string | bigint> =
//   `${T}` extends `-${infer Rest}`
//   ? Rest
//   : `${T}`;

type Absolute<T extends number | string | bigint> = T extends string
  ? T extends `-${infer Rest}`
    ? Rest
    : T
  : Absolute<`${T}`>;
