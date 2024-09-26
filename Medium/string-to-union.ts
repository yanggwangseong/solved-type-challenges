import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<StringToUnion<"">, never>>,
  Expect<Equal<StringToUnion<"t">, "t">>,
  Expect<Equal<StringToUnion<"hello">, "h" | "e" | "l" | "l" | "o">>,
  Expect<
    Equal<
      StringToUnion<"coronavirus">,
      "c" | "o" | "r" | "o" | "n" | "a" | "v" | "i" | "r" | "u" | "s"
    >
  >
];

// 문자열 인수를 입력받는 String to Union 유형을 구현하세요. 출력은 입력 문자열의 Union type이어야 합니다.
// ============= Your Code Here =============
// type StringToUnion<T extends string> = T extends `${infer Head}${infer Tail}`
//   ? Head | StringToUnion<Tail>
//   : never;

export type StringToUnion<
  T extends string,
  Acc extends string[] = []
> = T extends `${infer Head}${infer Tail}`
  ? StringToUnion<Tail, [...Acc, Head]>
  : Acc[number];
