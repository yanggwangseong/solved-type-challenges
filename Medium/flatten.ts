import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<Flatten<[]>, []>>,
  Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
  Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
  Expect<
    Equal<
      Flatten<[{ foo: "bar"; 2: 10 }, "foobar"]>,
      [{ foo: "bar"; 2: 10 }, "foobar"]
    >
  >
];

// @ts-expect-error
type error = Flatten<"1">;

// ============= Your Code Here =============
/**
 * Head와 Tail로 infer를 이용해서 분리한 후에 Head가 unknown[]인지 확인하고 재귀적으로 호출하여 평탄화한다.
 * 1. Head가 배열이라면 재귀적으로 호출하여 평탄화 + Tail도 재귀적으로 호출 평탄화
 * 2. Head가 배열이 아니라면 평탄화된 Head와 Tail을 재귀적으로 호출하여 평탄화
 * 3. 빈 배열이면 빈 배열 반환
 */
type Flatten<T extends unknown[]> = T extends [infer Head, ...infer Tail]
  ? Head extends unknown[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : [];
