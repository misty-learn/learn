<script setup>
const excludeCode = `



/* _____________ 你的代码 _____________ */

type MyExclude<T, U> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a'>, 'b' | 'c'>>,
  Expect<Equal<MyExclude<'a' | 'b' | 'c', 'a' | 'b'>, 'c'>>,
  Expect<Equal<MyExclude<string | number | (() => void), Function>, string | number>>,
]
`

</script>

# 实现 Exclude


实现内置的`Exclude <T, U>`类型，但不能直接使用它本身。


从联合类型T中排除U的类型成员，来构造一个新的类型。


例如：

```ts
type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
```


* 在下方编写代码：

<MonacoEditor :value="excludeCode" dir="simple" filename="exclude"/>


:::details 查看解答

```ts
type MyExclude<T, U> = T extends U ? never : T
```

:::
