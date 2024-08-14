// type DeepPick<T, K extends Paths<T>> = K extends `${infer Key}.${infer Rest}`
//   ? Key extends keyof T
//     ? Rest extends Paths<T[Key]>
//       ? { [P in Key]: DeepPick<T[Key], Rest> }
//       : never
//     : never
//   : K extends keyof T
//   ? { [P in K]: T[P] }
//   : unknown;

// // Helper type to create a union of all possible paths
// type Paths<T> = T extends object
//   ? {
//       [K in keyof T]: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never;
//     }[keyof T]
//   : never;

type DeepPick<T, K extends Paths<T>> = UnionToIntersection<
  K extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? Rest extends Paths<T[Key]>
        ? { [P in Key]: DeepPick<T[Key], Rest> }
        : never
      : never
    : K extends keyof T
    ? { [P in K]: T[P] }
    : unknown
>;

// Helper type to create a union of all possible paths
type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string ? `${K}` | `${K}.${Paths<T[K]>}` : never;
    }[keyof T]
  : never;

// Helper type to convert a union to an intersection
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

// Test cases
type Obj = {
  a: number;
  b: string;
  c: boolean;
  obj: {
    d: number;
    e: string;
    f: boolean;
    obj2: {
      g: number;
      h: string;
      i: boolean;
    };
  };
  obj3: {
    j: number;
    k: string;
    l: boolean;
  };
};

type Result1 = DeepPick<Obj, "obj.obj2.h" | "a" | "b">; // Suggests top-level keys: 'a', 'b', 'c', 'obj', 'obj3'
type Result2 = DeepPick<Obj, "obj3.j">; // Suggests 'j', 'k', 'l'
type Result3 = DeepPick<Obj, "obj.obj2.g">; // Suggests 'd', 'e', 'f', 'obj2'

const pick: Result1 = {
  a: 1,
  b: "1",
  obj: {
    obj2: {
      h: "1",
    },
  },
};
