# 数据库CRUD操作

## 数据库增删改查

### 创建数据库

1. 示例1
```shell
create database 数据库名称;

```

> 如果不存在可以创建一个新的数据库，如果数据库存在会报错

2. 示例2
```shell
create database if not exists person;

```

> 不会像示例1会报错

3. 示例3

```shell
create database if not exists person charset=utf8;

```

::: warning 注意点
创建的时候一般需要制定当前数据库的类型，为了避免将来读取的字符集和存储的字符集不一样导致乱码问题，
在创建数据库的时候需要指定数据库的字符集
:::
4. 查询全局保存数据的默认编码

```shell
show variables like 'character_set_%';

```

5. 查看指定数据库的编码


```shell
show create database 数据库名称;

```

::: warning 注意点
    如果使用数据库的关键字创建数据库需要对数据库名称加入'`数据库表名称`'
:::

### 删除一个数据库

1. 示例1:

```shell
drop database 数据库名称;

```


> 如果存在可以删除，不存在就会报错

2. 示例2：

```shell
drop database if exists 数据库名称;

```

> 解决示例1中出现的删除会报错的问题，存在就删除掉不存在就不需要进行删除。

### 修改和查看数据库

#### 修改

1. 修改字符集


```shell
alter database 数据库名称 charset=字符集;

```


#### 查看


```shell
1. show create database 数据库名称; 查看指定的数据库

2. show databases; 查看所有的数据库

```



## 表增删改查

### 查看数据库中的表

* 使用数据库

use 数据库名称;

* 查看数据库表

show tables;

### 创建一张表

```sql

CREATE TABLE 表名称(
    字段名称 数据类型,
    字段名称 数据类型,
    字段名称 数据类型
);

```

1. 示例1：

```sql

create table stu(
    id int,
    name text
)

```
> 如果数据库中存在表会报错;


2. 示例2：

```sql

create table if not exists stu(
    id int,
    name text
);

```

> 如果当前的表不存在就创建表，存在就不创建表

### 查看当前的表结构

desc 表名称;

### 删除表

1. 示例1：

drop table 表名称；
> 如果表存在就会删除表，不存在会报错

2. 示例2：

drop table if exists 表名称; 
> 如果需要删除的表存在就会删除表，不存在就跳过

### 修改表

#### 修改表名称

rename table 原始名称 to 新名称;

#### 新增字段

alter table 表名称 add 新增字段的名称 新增字段数据类型 [位置];

alter table person add age int ;

默认情况下会将新增字段放到原有字段的后面

alter table person add age int first;
* 可以通过first将当前新增的字段放到原有字段的前面

alter table person add age int after name;
* 可以通过after指定将新增的字段放到哪个字段的后面

#### 删除字段

alter table 表名称 drop 字段名称;

#### 修改字段

1. 修改字段的数据类型

alter table 表名 modify 需要修改的字段名称 新的数据类型;

alter table stu modify age char;

2. 修改字段的名称

alter table 表名 change 原始字段名称 新的字段名称 新的数据类型;

alter table stu change age gender char;

### MySql存储引擎

#### MyISAM

安全性低，但不支持事务和外键，适合频繁插入和查询的应用

#### InnoDB(默认)

安全性高，支持事务和外键，适合对安全性，数据完整性要求较高的应用

#### Memory 

访问速度极快，但不会永久存储数据，适合对读写速度要求较高的应用

```sql

create table stu(
    id int,
    name text
)engine=引擎名称;

```

#### 不同引擎的本质

* 如果表的存储引擎是InnoDB,那么只要创建表就会自动创建一个文件,这个文件就保存了这张表的结构
    * 如果网InnoDB的表中存储数据，那么数据会被存储到ibdata1的文件中，如果存储的数据较多，会自动创建ibdata2、ibdata3..

* 如果表的存储引擎是MyISAM，那么只要创建表就会自动创建三个文件
    * .sdi保存表的结构
    * .MYD这个文件保存表中存储的数据
    * .MYI这个文件保存表中的索引
    
* 如果使用Memory，那么只要创建表会自动创建一个文件，这个文件保存文件的表结构。
    * 如果表的存储引擎是Memory，那么就数据不会像其他两种引擎保存到文件中，直接保存到内存中
    
#### 修改表的存储引擎

alter table 表名 engine=引擎名称;

## MySQL数据增删改查

### 插入数据

insert into 表名(字段名称1,字段名2) values (值1,值2);

```sql

INSERT INTO stu(
    id,name
) values(
    1,'test'
);

```

::: warning 注意点：

1. 在插入数据的时候，指定的字段名称的顺序不需要和表中的字段的顺序一致
`insert into stu(id,name)values(1,'ww')`;
2. 在插入数据的时候，指定的取值的顺序必须和指定的字段的顺序一致，不然呢会报错
`insert into stu(name,id)values('ww',1)`;
3. 如果插入数据时，指定的取值的顺序和表中的字段的顺序一致，可以不指定表的字段
`insert into stu values(1,'ls')`;
4. 可以同时插入多条数据
`insert into values(2,'test1'),(3,'test2');`

:::


### 更新数据

`update 表名 set 字段名称 = 值 [where = 条件];`

示例1:

`update stu set age = 10;`
更新表的时候没有附加条件，那么就会更新整张表中的数据

示例2:

`update stu set age = 11 where name='ls';`
加条件更新指定的数据


### 查询表中的数据

#### 基础查询

select * from 表名称;

::: warning 注意点：

会将表中所有的数据都查询出来，所有性能比较差

:::

#### 附加条件查询

1. 查询特定字段

`select 字段名称1,字段名称2,字段名称3 from 表名 [where条件];`

2. 查询满足条件的数据

`select id,name from stu where score > 60;`

::: tip where支持的运算符:
 
1. = 、 != 、<> 、< 、<= 、> 、>=

2. in：固定值范围值

3. between...and:值在什么范围内

4. is null: 为空 is not null 不为空

5. and 与

6. or 或

7. not 非 
 
:::

### 删除表中数据

`delete from 表名称 [where 条件];`

