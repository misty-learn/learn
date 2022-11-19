# LeetCode算法题目

## 基础算法

### 字符串翻转

[题目地址557](https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/)

* JS实现

```js

// 解决1：
export const reverseWords = (str) => {
  let data = str.split(' ')
  let myStr = []
  for (let i = 0; i < data.length; i++) {
    myStr[i] = data[i].split('').reverse().join('')
  }
  return myStr.join(' ')
}

// 解法2：不会使用多余的变量
export const reverseWords2 = (str) => {
  return str.split(' ').map(v => {
    return v.split('').reverse().join('')
  }).join(' ')
}

// 正则
export const reverseWords3 = (str) => {
    return str.split(/\s/g).map(v => {
        return v.split('').reverse().join('')
    }).join(' ')
}

// match
export const reverseWords4 = (str) => {
    return str.match(/[\w']+/g).map(v => {
        return v.split('').reverse().join('')
    }).join(' ')
}

```

* PHP

```php

function reverseWords(string $s){
    $strArr = explode(' ',$s);
    $newStr = '';
    foreach ($strArr as $item => $value){
        if ($item === 0){
            $newStr.= strrev($value);
        }else{
            $newStr.= ' '.strrev($value);
        }
    }
    return $newStr;
}

function reverseWords2(string $s){
    return implode(' ',array_map('strrev',explode(' ',$s)));
}

```

### 计数二进制子串

[题目地址696](https://leetcode-cn.com/problems/count-binary-substrings/)

* 难度大的算法题目如何解决

算法的本质是寻找规律并实现

* 如何寻找规律

发现输入和输出的关系，寻找突破点

* 复杂的实现怎么办？

实现是程序+数据结构的结合体
