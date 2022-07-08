<script setup>
const helloWord = `/* _____________ 你的代码 _____________ */

type HelloWorld = any // expected to be a string


/* _____________ 测试用例 _____________ */
import type { Equal, Expect, NotAny } from '@type-challenges/utils'

type cases = [
  Expect<NotAny<HelloWorld>>,
  Expect<Equal<HelloWorld, string>>,
]`;
</script>

# Hello world

> 入门挑战我们先从Hello World启航

Hello, World!

这个简单的提问希望让你可以快速上手 Type Challenges。

在这里，我们使用了一些神奇的技巧让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。


```ts
// 期望是一个 string 类型
type HelloWorld = any
```

```ts
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>

```

* 在下方编码实现：


<MonacoEditor :value="helloWord" :filename="'helloWord'"/>
