import { Equal, Expect } from "../test-utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>
];

// ============= Your Code Here =============
type DropChar2<
  S,
  C extends string
> = S extends `${infer Left}${C}${infer Right}`
  ? DropChar2<`${Left}${Right}`, C>
  : S;

type DropChar<S, C extends string> = S extends `${infer Head}${infer Tail}`
  ? `${C extends Head ? "" : Head}${DropChar<Tail, C>}`
  : "";
