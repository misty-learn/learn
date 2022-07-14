<script setup>
    const ConcatCode = `


/* _____________ Your Code Here _____________ */

type Concat<T,U> = any


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Concat<[], []>, []>>,
  Expect<Equal<Concat<[], [1]>, [1]>>,
  Expect<Equal<Concat<[1, 2], [3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<Concat<['1', 2, '3'], [false, boolean, '4']>, ['1', 2, '3', false, boolean, '4']>>,
]

`;
</script>

# 实现Concat

> 在类型系统里实现`JavaScript`内置的`Array.concat`方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

例如：

```ts
type Result = Concat<[1], [2]> // expected to be [1, 2]
```

* 在下方作答：

<MonacoEditor :value="ConcatCode" dir="simple" filename="concat"/>


:::details 查看解答

```ts
type Concat<T extends any[], U extends any[]> = [...T, ...U]
```
:::
