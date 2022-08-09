<script setup>
    const includesCode = `
/* _____________ 你的代码 _____________ */

type Includes<T extends readonly any[], U> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Kars'>, true>>,
  Expect<Equal<Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>, false>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 7>, true>>,
  Expect<Equal<Includes<[1, 2, 3, 5, 6, 7], 4>, false>>,
  Expect<Equal<Includes<[1, 2, 3], 2>, true>>,
  Expect<Equal<Includes<[1, 2, 3], 1>, true>>,
  Expect<Equal<Includes<[{}], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[boolean, 2, 3, 5, 6, 7], false>, false>>,
  Expect<Equal<Includes<[true, 2, 3, 5, 6, 7], boolean>, false>>,
  Expect<Equal<Includes<[false, 2, 3, 5, 6, 7], false>, true>>,
  Expect<Equal<Includes<[{ a: 'A' }], { readonly a: 'A' }>, false>>,
  Expect<Equal<Includes<[{ readonly a: 'A' }], { a: 'A' }>, false>>,
  Expect<Equal<Includes<[1], 1 | 2>, false>>,
  Expect<Equal<Includes<[1 | 2], 1>, false>>,
  Expect<Equal<Includes<[null], undefined>, false>>,
  Expect<Equal<Includes<[undefined], null>, false>>,
]
`
</script>

# Includes 实现

在类型系统里实现`JavaScript`的`Array.includes`方法，这个类型接受两个参数，返回的类型要么是`true`要么是`false`。

例如：

```ts

type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'> // expected to be `false`
```


<MonacoEditor :value="includesCode" dir="simple" filename="includes"/>

:::details 查看解答

```ts
type MyEqual<A, B> = (<T>() => T extends A ? 1:0) extends (<T>() => T extends B ? 1 :0) ? true : false

type Includes<T extends readonly any[], U> = T extends [infer A, ...infer B] ?
  MyEqual<A, U> extends true ?
    true :
    (B extends [] ?
      false :
      (Includes<B, U> extends true ?true : false)
    )
  : false
```
:::