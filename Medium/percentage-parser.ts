import { Equal, Expect } from "../test-utils";

type Case0 = ["", "", ""];
type Case1 = ["+", "", ""];
type Case2 = ["+", "1", ""];
type Case3 = ["+", "100", ""];
type Case4 = ["+", "100", "%"];
type Case5 = ["", "100", "%"];
type Case6 = ["-", "100", "%"];
type Case7 = ["-", "100", ""];
type Case8 = ["-", "1", ""];
type Case9 = ["", "", "%"];
type Case10 = ["", "1", ""];
type Case11 = ["", "100", ""];

type cases = [
  Expect<Equal<PercentageParser<"">, Case0>>,
  Expect<Equal<PercentageParser<"+">, Case1>>,
  Expect<Equal<PercentageParser<"+1">, Case2>>,
  Expect<Equal<PercentageParser<"+100">, Case3>>,
  Expect<Equal<PercentageParser<"+100%">, Case4>>,
  Expect<Equal<PercentageParser<"100%">, Case5>>,
  Expect<Equal<PercentageParser<"-100%">, Case6>>,
  Expect<Equal<PercentageParser<"-100">, Case7>>,
  Expect<Equal<PercentageParser<"-1">, Case8>>,
  Expect<Equal<PercentageParser<"%">, Case9>>,
  Expect<Equal<PercentageParser<"1">, Case10>>,
  Expect<Equal<PercentageParser<"100">, Case11>>
];

type Result7 = ParseSig<"-100">;
type Result8 = PercentageParser<"1">;
type Result9 = ParsePer<"888w9efwuefhi%%">;
// ============= Your Code Here =============
/**
 * 튜플로 [Sig, ParseNum, ParsePer]
 * 로 나눠야 한다.
 */

type ParseSig<T extends string> = T extends `${infer K extends
  | "+"
  | "-"}${infer Tail}`
  ? K
  : "";
type ParseNum<T extends string> =
  T extends `${ParseSig<T>}${infer K}${ParsePer<T>}` ? K : "";
type ParsePer<T extends string> = T extends `${string}${infer Tail extends "%"}`
  ? Tail
  : "";

type PercentageParser<A extends string> = [
  ParseSig<A>,
  ParseNum<A>,
  ParsePer<A>
];
