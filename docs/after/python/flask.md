# Flask学习

## 安装

```shell
pip install Flask
```

## 使用

> 一个简单的使用样例

`app.py`

```python
from flask import Flask
app = Flask(__name__)


@app.route("/")
def index():
    return 'Hello Word'

```

### 启动项目

#### Linux下配置

```shell
export FLASK_APP=app.py
flask run
```

#### Win下配置

```shell
set FLASK_APP=app.py
flask run
```

#### 通用方式

```shell
python -m flask run
```

#### 配置

```
-h, --host=0.0.0.0 # 设置监听的ip
-p, --port=5000 # 设置端口号
```

#### 调试模式

```shell
# linux配置
export FLASK_ENV=development
# win下配置
set FLASK_ENV=development
```

## 路由

```python
# 普通路由
@app.route('/')
def index():
    return "index"
# 参数路由
@app.route('/user/<id>')
def userinfo(id):
    return "user %s" % escape(id)
# 可以指定对应的类型<类型:参数> === <converter:variable_name>
```

* 支持的类型

|  类型  |             注释              |
| :----: | :---------------------------: |
| string |       默认，字符串类型        |
|  int   |             整型              |
| float  |            浮点型             |
|  path  | 类似string，但可以包含斜杠`/` |
|  uuid  |        传入uuid字符串         |

