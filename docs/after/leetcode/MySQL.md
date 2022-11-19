# MySQL算法

## 175. 组合两个表

表1: `Person`

```
+-------------+---------+
| 列名         | 类型     |
+-------------+---------+
| PersonId    | int     |
| FirstName   | varchar |
| LastName    | varchar |
+-------------+---------+
PersonId 是上表主键
```

表2: `Address`

```
+-------------+---------+
| 列名         | 类型    |
+-------------+---------+
| AddressId   | int     |
| PersonId    | int     |
| City        | varchar |
| State       | varchar |
+-------------+---------+
AddressId 是上表主键

```

编写一个 SQL 查询，满足条件：无论 person 是否有地址信息，都需要基于上述两表提供 person 的以下信息：

```
FirstName, LastName, City, State
```
解析： 这个题目考察的是使用表与表之间的连接来实现，表的连接分为三种：

* 内连接 (inner) join
  内联接使用比较运算符根据每个表共有的列的值匹配两个表中的行。例如，检索 students和courses表中学生标识号相同的所有行。
* 外连接
  * 左外连接 (left) join
    结果表中除了匹配行外，还包括左表有而右表中不匹配的行，对于这样的行，右表选择列置为null。
  * 右外连接 (right) join
    结果表中除了匹配行外，还包括右表有而左表中不匹配的行，对于这样的行，左表选择列置为null。
* 全连接 (full) join
  完整外部联接返回左表和右表中的所有行。当某行在另一个表中没有匹配行时，则另一个表的选择列表列包含空值。如果表之间有匹配行，则整个结果集行包含基表的数据值。
* 交叉连接 (cross) join
  交叉连接，cross join，交叉连接，实际上就是将两个表进行笛卡尔积运算，结果表的行数等于两表行数之积
  
### 题解：

```sql

SELECT P.FirstName , P.LastName, A.City, A.State FROM Person as P 
LEFT JOIN Address as A on P.PersonId = A.PersonId;

```

::: warning 注意点：

有可能一开始在写代的时候首先想到的不是连接，而是两个表的where查询，如下代码：

```

select Person.FirstName, Person.LastName, Address.City, Address.State 
from Person, Address 
where Person.PersonId = Address.PersonId

```

如果地址表中查询的所有人的地址都存在，那么这么做没有问题。
但是，题目中强调了，人一定存在，但地址不一定。
就要考虑后者的情况了。where语句就行不通了。

:::

## 176. 第二高的薪水

编写一个 SQL 查询，获取 `Employee` 表中第二高的薪水（`Salary`）。

```
+----+--------+
| Id | Salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+

```

例如上述 `Employee` 表，SQL查询应该返回 200 作为第二高的薪水。如果不存在第二高的薪水，那么查询应返回 `null`。

```
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+

```
### 题解1：

查询`Salary`的时候排重数据，然后倒叙排序，限制数据取出为1并且从第二开始取，使用了`IFNULL()`函数，判断如果查询出来是`null`则返回第二个值

```

SELECT IFNULL(( SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC limit 1,1),null) as SecondHighestSalary;
```

### 题解2：

先查询一次获取最大值，然后排除掉最大值，拿到次大值即可实现。

```
SELECT max(Salary) as SecondHighestSalary FROM Employee WHERE Salary < (SELECT max(Salary) FROM Employee);

```
### 扩展题目第N高的薪水

题目通上一样，只是换成N高的薪水：

同样考察的是LIMIT(从第几个开始,取几个值)

```

CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    declare m INT;
    SET m = N-1;
  RETURN (
      # Write your MySQL query statement below.
      SELECT DISTINCT Salary FROM Employee ORDER BY Salary DESC LIMIT m,1 
  );
END

```
目前不一定是最完美的解决方式，只是后期继续跟上更多的解决方案
