<script setup>
const firstOfArray = `



/* _____________ 你的代码 _____________ */

type First<T extends any[]> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

type errors = [
  // @ts-expect-error
  First<'notArray'>,
  // @ts-expect-error
  First<{ 0: 'arrayLike' }>,
]
`;
</script>

# 数组中第一个元素


实现一个通用`First<T>`，它接受一个数组T并返回它的第一个元素的类型。


例如：

```ts

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]

type head1 = First<arr1> // expected to be 'a'
type head2 = First<arr2> // expected to be 3

```

* 在下方编写代码：


<MonacoEditor :value="firstOfArray" dir="simple" filename="first-of-array"/>


:::details 查看解答

```ts
// base one
type First<T extends any[]> = T['length'] extends 0 ? never : T[0]
// base two
type First<T extends any[]>= T extends [] ? never : T[0]


```
