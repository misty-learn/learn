<script setup>
const awaitedCode = `


/* _____________ 你的代码 _____________ */

type MyAwaited = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type X = Promise<string>
type Y = Promise<{ field: number }>
type Z = Promise<Promise<string | number>>
type Z1 = Promise<Promise<Promise<string | boolean>>>

type cases = [
  Expect<Equal<MyAwaited<X>, string>>,
  Expect<Equal<MyAwaited<Y>, { field: number }>>,
  Expect<Equal<MyAwaited<Z>, string | number>>,
  Expect<Equal<MyAwaited<Z1>, string | boolean>>,
]

// @ts-expect-error
type error = MyAwaited<number>
`

</script>

# Awaited 实现

> 假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回`ExampleType`的类型

```ts
type ExampleType = Promise<string>

type Result = MyAwaited<ExampleType> // string
```

* 在下方作答：

<MonacoEditor :value="awaitedCode" dir="simple" filename="awaited"/>


:::details 查看解答

```ts
type MyAwaited<T> = T extends Promise<infer A> ? A extends Promise<any> ? MyAwaited<A>: A : never
```

:::