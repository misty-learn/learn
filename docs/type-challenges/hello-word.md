<script setup>
const helloWord = `

/* _____________ 你的代码 _____________ */

// 期望是一个 string 类型
type HelloWorld = any 


/* _____________ 测试用例 _____________ */
// 你需要使得如下这行不会抛出异常
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]`;
</script>

# Hello world

入门挑战我们先从Hello World启航，这个题目能让你快速上手`Type Challenges`。

在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。


* 请在下方代码实现：


<MonacoEditor :value="helloWord" :filename="'helloWord'"/>


:::details 查看解答

```ts

type HelloWorld = string

```
:::
