# Vue3体验日记

## 15个Vue3常用API

+ [快速使用Vue3最新的15个常用API](https://mp.weixin.qq.com/s?__biz=MzI4NDYxNTM0OQ==&mid=2247486229&idx=1&sn=9ec801f3f2c1d0a67c25f74b509a016f&chksm=ebf9fccfdc8e75d985f2cbd550c020bd94c6c9937117abd5a97185915c09b68f0b433b36fdee&scene=126&sessionid=1607407783&key=140d9acf5ef9701c09b6a636a01379c66f4214b9b4d20fd9543b6c4a524c1cf261799bd97a05be8c6866eb9552f8e82a08947fd004de025b57b00407d9e29bb43464dd2f64dcb70c0a1ff8499d56af808c1d37d65a4923f095942fa6ac7db7714106b84a0e8e3fbaa176d1cb725be04484728e8c52c639d25bbf685d756b3b59&ascene=1&uin=Mjk2Njk4MjQ0MA%3D%3D&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=A5Av2R9ztjuSANK5UgO2o1w%3D&pass_ticket=qvS5hJTWNqEj%2BExnbSf8DGj2c5zb02pRe6iel3IaBe3LBSKZp3QXaW3hKqC9QuvA&wx_header=0)

## 与Vue2开发体验对比

1. main.ts

```typescript
// vue3
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'style/index.less'
import { Button, message } from 'ant-design-vue'
const app = createApp(App)
app.config.globalProperties.$message = message

app.use(Button)

app
  .use(store)
  .use(router)
  .mount('#app')
   
```

2. transition 页面切换动画写法

+ Vue2

```vue
<transition name="fade-transform" mode="out-in">
    <keep-alive include="">
    	<router-view />
    </keep-alive>
</transition>
```

```css
/*fade-transform*/
.fade-transform-leave-active,
.fade-transform-enter-active {
	transition: all 0.5s;
}
.fade-transform-enter {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
```

+ Vue3

```vue
<router-view v-slot="{ Component }">
	<transition name="fade-transform" appear>
        <component :is="Component" />
	</transition>
</router-view>
```

```css
/*fade-transform*/
.fade-transform-leave-active {
    transition: all 0.5s ease-in-out;
}
.fade-transform-enter-active {
    /*必须设置延迟时间*/
    transition: all 0.5s ease-in-out 0.5s;
}
.fade-transform-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}
.fade-transform-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
```

3. Composition API VS Options API

+ Composition Api

1. ==setup== 函数是composition api的入口函数，变量、方法都在里面定义。

2. ==ref== 接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property.value。

3. ==reactive== 返回对象的响应式副本。

4. ==toRef== 可以用来为源响应式对象上的 property 性创建一个 [`ref`](https://vue3js.cn/docs/zh/api/refs-api.html#ref)。然后可以将 ref 传递出去，从而保持对其源 property 的响应式连接。

5. ==toRefs== 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的ref。



+ 如何选择ref/reactive？

1. 基本类型值（`String` 、`Nmuber` 、`Boolean` 等）或单值对象（类似像 `{count: 3}` 这样只有一个属性值的对象）使用 `ref`

2. 引用类型值（`Object` 、`Array`）使用 `reactive`

    

+ 跨组件通信eventBus

  Vue3不再使用Bus.$on(), Bus.$emit()的方式进行跨组件通信，而是通过引入mitt库实现

```javascript
// Vue2 eventBus.js
import Vue from 'vue'
export default new Vue()
// components
import Bus from '@/utils/eventBus'
Bus.$on('some-event', function (params) {
    // TODO: do sth...
});

Bus.$emit("some-event", params)
```

```typescript
// eventBus.ts
import mitt, { Emitter } from 'mitt'
const Bus: Emitter = mitt()
export default Bus
// components
import Bus from '@/utils/eventBus'
Bus.on('some-event', params => {
    // TODO: do sth...
})
Bus.emit('some-event')
```

+ 具体例子

```vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <br />
    <p>{{ receiveMsg }}</p>
    <p>{{ extractMsg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import Bus from '@/utils/eventBus'
export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const receiveMsg = ref(
      'this is default msg, im waiting an msg from HelloWorld component!'
    )

    const extractMsg = computed(() => `computed example: ${receiveMsg.value}`)

    watch(
      () => receiveMsg.value,
      (cur, prev) => {
        console.log(cur)
        console.log(prev)
      }
    )

    Bus.on('hello', receive => {
      receiveMsg.value = receive.msg
    })

    return { receiveMsg, extractMsg }
  }
})
</script>
```

```vue
<template>
  <div>
    <a-button @click="emitEvent">send a msg by eventBus!</a-button>
    <a-button @click="changeRefTitle">
      change toRef-normalArticleTitle!
    </a-button>
    <a-button @click="changeReactiveTitle">
      change reactive-reactiveArticle.title
    </a-button>
    <a-button @click="changeFrontEnd">
      change FrontEnd
    </a-button>
    <h1>props: {{ msg }}</h1>
    <p>toRef-normalArticleTitle:-----------{{ normalArticleTitle }}</p>
    <p>
      reactive-reactiveArticle:-----------{{ reactiveArticle.title }},
      {{ reactiveArticle.author }}
    </p>
    <p>
      Array now is reactive! ----------
      <span v-for="item in frontEnd" :key="item">{{ item }} &nbsp;</span>
    </p>
    <p>{{ database.mysql._object.mysql }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef, toRefs, isRef, reactive } from 'vue'
import Bus from '@/utils/eventBus'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    const emitEvent = () => {
      Bus.emit('hello', {
        msg: 'hello! this is a message from HelloWorld component'
      })
    }

    const normalArticle = {
      title: 'ts-book',
      author: 'huangyi'
    }

    const reactiveArticle = reactive({
      title: 'ts-book',
      author: 'huangyi'
    })

    const frontEnd = reactive(['vue', 'react', 'angular'])

    const database = toRefs(
      reactive({
        mysql: 'mysql',
        oracle: 'oracle',
        mongodb: 'mongodb'
      })
    )

    const normalArticleTitle = toRef(normalArticle, 'title')

    const changeRefTitle = () => {
      normalArticleTitle.value = 'ts-axios'
      console.log(`articleTitle: ${normalArticleTitle.value}`)
      // articleTitle: ts-axios
      // 数据更新了，说明toRef传递的是数据的引用
      console.log(`normalArticle: ${normalArticle.title}`)
      // normalArticle: ts-axios
      // 数据更新了，页面数据并没有“立即”更新，因为normalArticle并没有定义为响应式数据
      // 页面该数据 <p>toRef-title:{{ normalArticleTitle }}</p> 会在“下一次页面数据更新”时一起更新
    }

    const changeReactiveTitle = () => {
      reactiveArticle.title = 'Vue3 learning'
      // 数据，视图都相应更新了
    }

    const changeFrontEnd = () => {
      frontEnd[2] = 'node'
      // 可以监听数组变化了
    }

    setTimeout(() => {
      database.mysql.value = 'mysql5.7'
      // 数据，视图都更新了
    }, 1000)

    console.log(
      `database.mysql is Ref? ${isRef(database.mysql)} ${database.mysql.value}`
    )
    // database.mysql is Ref? true

    return {
      emitEvent,
      reactiveArticle,
      normalArticleTitle,
      changeRefTitle,
      changeReactiveTitle,
      frontEnd,
      changeFrontEnd,
      database
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
```

+ 生命周期

  Vue2中有 `beforeCreate` 、`created` 、`beforeMount` 、`mounted` 、`beforeUpdate` 等生命周期函数。

  Vue3中，这些生命周期部分有所变化，并且调用的方式也有所改变

| vue2          | vue3            |
| ------------- | --------------- |
| beforeCreate  | setup           |
| created       | setup           |
| beforeMount   | onBeforeMount   |
| mounted       | onMounted       |
| beforeUpdate  | onBeforeUpdate  |
| updated       | onUpdated       |
| beforeDestory | onBeforeUnmount |
| destoryed     | onUnmounted     |

```vue
<template>
  <div id="app"></div>
</template>

<script>
// 1. 从 vue 中引入 多个生命周期函数
import { defineComponent, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, unMounted} from 'vue'
export default defineComponent ({
  name: 'App',
  setup() {
    onBeforeMount(() => {
      // 在挂载前执行某些代码
    })

    onMounted(() => {
      // 在挂载后执行某些代码
    })

    onBeforeUpdate(() => {
      // 在更新前前执行某些代码
    })

    onUpdated(() => {
      // 在更新后执行某些代码
    })

    onBeforeUnmount(() => {
      // 在组件销毁前执行某些代码
    })

    unMounted(() => {
      // 在组件销毁后执行某些代码
    })

    return {}
  }
  
})
</script>
```

