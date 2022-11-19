# Redis-Api操作

默认情况下Redis给我们创建16个数据库，如果默认不指定数据库默认使用第0个数据，
切换数据库的命令`select index` index为切换数据库的索引0~15

## 字符串操作

### 增

set key value

### 改

set key value

如果当前的key已经存在就是修改

### 查

get key

### 删

del key

删除为通用操作

### 高级操作

1. setnx

setnx key value

如果指定的key值存在，就不新增，不存在就新增

2. 参数xx

set key value xx

key值是否存在，存在就修改，不存在就不操作

3. mset 多key-value操作(批量)

```shell

mset name test age 66 gender man

```

4. mget 多值获取（批量）

mget name age gender

5. 设置新值返回旧值

getset key newValue

返回旧的值并设置为新的值

6. append 追加值

append key value

往已存在的key中追加值

7. strlen 字符串长度统计

strlen key

8. getrange

getrange key start end

获取字符串的指定长度

9. setrange

setrange key offset value

从指定位置开始修改值

10. incr

incr key

给指定的key对应的vlaue自增1，如果key不存在会自动新增，并从0开始自增1

11. decr 

decr key

给指定的key对应的value自减1，如果key不存在就会自动新增，并从0开始自减1

12. incrby 

incrby key number

指定自增的的数值

13. decrby

decrby key number

指定自减的数值

14. incrybyfloat

incrbyfloat key floatNumber

小数方式递增（正数）递减（负数）

## 通用操作符

* 查询当前数据库中所有的key

`keys *`

* 清空当前数据库

`flushdb`

* 清空所有数据库（清空所有数据库）

`flushall`

**由于Redis是单线程的，以上操作都是非常耗时的操作，所以起亚开发中不推荐使用**

* 计算当前数据库中有多少key

`dbsize`

dbsize并不是遍历统计得到当前数据库key的总数，而是每次操作时，内部会自动统计，
所以dbsize并不是一个耗时的操作，我们可以在企业开发中大胆的去使用

* 查看value数据类型

`type key`

* 判断指定key是否存在

`exists key`

存在返回1 不存在返回0

* 设置过期时间

`expire key seconds`

如果有过期时间，就更新过期时间，没有则创建一个过期时间

* 查看过期时间

`ttl key`

* 取消过期时间

`persist key`

返回-1就没有过期时间，key不存在或者已被删除返回-2 同ttl

## Hash

### 增

hset key field value

### 查

hget key field

### 改

hset key filed value

存在就修改，不存在就新增

### 删

hdel key field

返回1代表删除成功

del key

删除整个hash对象

### 高级操作

1. 批量新增

hmset key field1 value1 field2 value2 ... ...

2. 批量查询

hmget key field1 field2

3. 工具指令

hlen key 返回key储存的hash表中有多少条数据

hexists key field 判断指定的key存储的Hash中是否有指定字段

0代表不存在1代表存在

4. 查询所有的field

hkeys key

获取指定key保存的所有字段

hvals key

获取指定key保存的所有的值

hgetall key

获取指定的key和值

以上操作是非常耗时的操作，不推荐使用，容易阻塞单线程

## List

Redis的Value除了可以存储字符串和Hash类型以外，还可以存储List类型
List类型就相当于JavaScript中的数组，可以把整个数组当做一个Value存储起来

List是有序的

### 增

* 从第二个Value开始添加到前一个的左边
    * lpush key value1 value2 value3
    * 例如：lpush arr1 aa bb cc -> cc bb aa
* 从第二个Value开始添加到前一个的右边
    * rpush key value1 value2 value3
    * 例如：rpush arr1 aa bb cc -> aa bb cc

### 查

* 查询指定范围
    * lrange key startIndex endIndex
    * 索引从0开始，endIndex等于-1表示取到最后
* 查询指定索引数据
    * lindex key index
    * 从前往后索引从0开始，从后往前索引从-1开始

### 修

lset key index value

注意index从0开始

### 删

* lpop key # 删除最左边的一个元素

* rpop key # 删除最右边一个元素

* lrem删除指定个数的指定元素

lrem key count value

count: 为负数从右边向左边查找

count: 为正数从左边向右边查找

count: 为0会删除所有的value值

value: 要删除的值

ltrim key start end

start 为开始剪切的索引

end 为剪切结束的索引

### 其他操作

* 在某个值的前面插入新的值
linsert key before 在哪个值的前面插入值 value

* 在某个值的后面插入新的值
linsert key after 在哪个值的后面插入值 value

* 获取列表长度
llen key

### 应用场景

列表实现简单的数据结构

* 栈结构（水桶） - 先进后出

lpush + lpop

* 队列结构（水管） - 先进先出

lpush + rpop

所以在企业开发中，如果需要先进后出或者先进先出的数据，我们就可以将这些数据存储到Redis的列表中

## Set集合操作

集合就是一堆无序的数据，Redis可以报一堆无序的数据当做Value存储起来

::: warning 注意点

集合中不能出现重复的数据

:::

### 增

sadd key value1 value2 value3 ...

### 查

smembers key

取出的数据是无序的

`srandmember key [count]`

count:随机取出n个数据

### 删

`spop key [count]`

count 随机删除n个数据

指定删除数据

`srem key value`

### 修改

因为数据是无序的无法进行修改数据

### 其他操作

* 追加元素
    * sadd:key不存在就新增，存在就追加数据

* 统计集合中的元素个数

scard key

* 判断某个元素是否存在

sismember key value

返回0为不存在1为已存在

* 集合中支持交集，并集和差集

    * 交集
        sinter key1 key2
    * 并集
        sunion key1 key2
    * 差集
        sdiff  key1 key2
        
        谁在前面就求谁的差集
### 应用场景

* 抽奖
    * `srandmember key [count]`
* 绑定标签
    * `sadd key val1 val2`
* 社交关系
    * 交集
    * 并集
    * 差集
    
## 有序集合

ZSet是有序集合，Redis可以把一堆通过权重排序的数据当做一个Value存储起来

### 增

zadd key 权重1 value1 权重2 value2

### 查

* 查询排名数据从小到大
zrange key start end

* 按照权重范围内的数据

zrangebyscore key min max

* 查询权重

zscore key val

* 查询权重范围内的个数

zcount key min max

### 删

zrem key value

zremrangebyrank key 排名1 排名2

zremrangebyscore key 权重1min 权重2max

### 其他操作

* 增加或减少元素权重
    * zincrby key score element
    score为正数就是增加权重为负数就是减少权重
* 从高到低的操作
    * zrevrange key start end
    
应用场景：
    存储排行榜数据

## 发布订阅

在发布订阅中有三个角色：发布者(publisher)/订阅者(subscriber)/频道(channel)，
只要发布者将消息发送至对应的频道中，那么所有的订阅者都能收到这个消息，这个就是Redis的发布订阅

列举现实生活中的发布订阅：

'张三和李四'去'商店'买鞋，但是最近炒鞋的人比较多，所以鞋子已经卖完了，
于是商店老板就让张三和李四先加粉丝群，到货了就会在群里通知

这里的商店老板是发布者

粉丝圈为频道

张三李四为订阅者

只要张三和李四加了粉丝群，老板在群里发送消息，张三和李四就能收到老板的消息

### 订阅频道

* subscribe channel ... ...

### 发布消息

* publish channel message

### 退订频道
* unsubscribe channel ... ...