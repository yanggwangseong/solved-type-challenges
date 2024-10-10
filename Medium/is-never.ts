import { Equal, Expect } from "../test-utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
/**
 * 실패함 [T] extedns [never]로 비교 해야 되나보다
 */
// type IsNever<T> = [T] extends [never] ? true : false;

/*
|     | [never] | never[] |
| --- | ------- | ------- |
| [T] | ✓ (0)   | ✓ (1)   |
| T[] | ✓ (2)   | ✓ (3)   |
*/
type IsNever0<T> = [T] extends [never] ? true : false;
type IsNever1<T> = [T] extends never[] ? true : false;
type IsNever2<T> = T[] extends [never] ? true : false;
type IsNever3<T> = T[] extends never[] ? true : false;

type IsNever<T> = Exclude<T, never> extends never ? true : false;
