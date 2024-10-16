import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<"a" | "b" | "c" | "d">, true>>,
  Expect<Equal<IsUnion<undefined | null | void | "">, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | "a">, false>>,
  Expect<Equal<IsUnion<never>, false>>
];

// ============= Your Code Here =============
/**
 * 제네릭 2번째 자리에 하나 더 넣어서 T를 복사한 후에 풀어가는거구나
 * 이거 생각보다 어려운디요?
 */

// never 인지 확인
type checkNever<T, Copy = T> = [T] extends [never] ? true : false;

type Result1 = checkNever<"a" | "b" | "c" | "d">; // false
type Result2 = checkNever<string>; // false
type Result3 = checkNever<never>; // false

// type IsUnion<T, Copy = T> = [T] extends [never]
//   ? false
//   : T extends never
//   ? false
//   : [Copy] extends [T]
//   ? false
//   : true;

type IsUnion<T, Copy = T> = [T] extends [never]
  ? false
  : T extends never
  ? false
  : [Copy] extends [T]
  ? false
  : true;

/**
 * 실험 결과들
 */
type Result4 = IsUnion<undefined | null | void | "">; // false

type ExampleNoDistribute<T> = [T] extends [string]
  ? "It's a string"
  : "It's not a string";

type Test2 = ExampleNoDistribute<string | number>;

interface Person {
  name: string;
  age: number;
}

interface Home {
  addr: string;
}

type EXDistribute<T> = T extends Person ? "person 입니다" : "home 입니다";
type EXNoDistribute<T> = [T] extends [Person] ? "person 입니다" : "home 입니다";

/**
 * 대괄호 사용시 정확하게 타입으 비교한다.
 */
type Result5 = EXNoDistribute<Person | Home>; // ✅ 추론 결과 : type Result5 = "home 입니다"
type Result6 = EXNoDistribute<string | number>; // ✅ 추론 결과 : type Result6 = "home 입니다"
type Result7 = EXNoDistribute<string | number>; // ✅ 추론 결괴 : type Result7 = "home 입니다"
type Result8 = EXNoDistribute<string | number>; // ✅ 추론 결괴 : type Result8 = "home 입니다"

type Result9 = EXNoDistribute<Person>; // ✅

/**
 * 분배 법칙으로 인해 유니온으로 결과값들이 추론되어버린다!!!
 */
type Result10 = EXDistribute<Person | Home>; // ❌ // 추론 결과 : type Result10 = "home 입니다" | "person 입니다"
type Result11 = EXDistribute<string | number>; // ❌ // 추론 결과 : type Result10 = "home 입니다" | "person 입니다"
type Result12 = EXDistribute<string | number>; // ❌ // 추론 결과 : type Result10 = "home 입니다" | "person 입니다"
type Result13 = EXDistribute<string | number>; // ❌ // 추론 결과 : type Result10 = "home 입니다" | "person 입니다"

type Result14 = EXDistribute<Person>; // ✅
