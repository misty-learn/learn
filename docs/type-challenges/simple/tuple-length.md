<script setup>
const tupleLength = `



/* _____________ 你的代码 _____________ */

type Length<T> = any


/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

const tesla = ['tesla', 'model 3', 'model X', 'model Y'] as const
const spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT'] as const

type cases = [
  Expect<Equal<Length<typeof tesla>, 4>>,
  Expect<Equal<Length<typeof spaceX>, 5>>,
  // @ts-expect-error
  Length<5>,
  // @ts-expect-error
  Length<'hello world'>,
]

`

</script>


# 获取元祖长度


创建一个通用的`Length`，接受一个`readonly`的数组，返回这个数组的长度。



例如：

```ts
type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']

type teslaLength = Length<tesla> // expected 4
type spaceXLength = Length<spaceX> // expected 5

```

* 请在下面作答：


<MonacoEditor :value="tupleLength" dir="simple" filename="tuple-length"/>


:::details 查看解答

```ts
type Length<T extends readonly any[]> = T['length']

```
:::
