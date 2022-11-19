# Vue中使用TS

可以通过类的方式来定义组件

借助官方的库文件

官方网址：https://class-component.vuejs.org/


## 基本的使用

父组件：Home
```vue

<template>
  <div>
    <h1 @click="myFun">{{title}}</h1>
    <h2>{{msg}}</h2>
    <son parentdata="sss" @parentFn="sonFn"></son>
  </div>
</template>

<script lang="ts">
import { Vue,Component,Watch } from 'vue-property-decorator';
import Son from '../components/Son'
@Component({
  // 如果在类中找不到需要添加的内容，那么就可以写在这里
  components:{
    Son
  }
})
export default class Home extends Vue {
  // 相当于data中的属性
  title:string = "你好"
  // 定义一个方法
  // 如果是通过类的方式来定义组件，那么类中的方法就是过去的methods
  myFun(){
    alert("test")
  }

  sonFn(data:any){
    alert(data)
  }

  // 计算属性
  // 如果是通过类的方式来定义组件,那么类中的get方法就是过去的computed方法
  get msg(){
    return "ssss";
  }

  // 属性观察watch
  // 第一个参数是需要观察的属性名称，
  // 第二个是一个配置deep:true，是否开始深度监听
  @Watch("message",{deep:true})
  $message(newValue:string,oldValue:string){
    console.log(newValue, oldValue);
  }
}
</script>


```

子组件：Son
```vue
<template>
  <div>
    {{message}}

    {{parentdata}}
    <button @click="sonFn">你好</button>
  </div>
</template>

<script>
import { Vue,Component,Prop,Emit } from 'vue-property-decorator';
@Component
export default class Son extends Vue{
  message = "我是子组件"

  @Prop(String) parentdata;

  @Emit('parentFn')
  sonFn(){
    return "Ssss";
  }
}
</script>

<style scoped>

</style>


```
